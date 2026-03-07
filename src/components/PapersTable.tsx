import {useEffect, useMemo, useState} from "react";
import Papa, {ParseResult} from "papaparse";
import {MaterialReactTable, type MRT_ColumnDef, useMaterialReactTable} from "material-react-table";
import Dimensions from "../interfaces/Dimensions";
import PaperRecord from "../interfaces/PaperRecord";
import {setSelectedPaperRecord} from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {labelsArrangementFinders} from "./ArrangementFinderSelector";
import ArrangementFinder from "../interfaces/ArrangementFinder";
import {isEqual, isFunction, round, size, sumBy} from "lodash-es"
import {matchPaperName} from "../data/standardPaperSizes";
import createMarginAwareArrangementFinder from "../utils/createMarginAwareArrangementFinder";

export const PapersTable = () => {
    const dispatch = useDispatch();
    const [papersDimensions, setPapersDimensions] = useState<Dimensions[]>([]);
    const arrangementFinder: ArrangementFinder | null = useSelector((state: RootState) =>
        state.arrangementFinderLabel ? labelsArrangementFinders[state.arrangementFinderLabel] : null
    );
    const bookDimensions = useSelector((state: RootState) => state.bookDimensions, isEqual);
    const printSettings = useSelector((state: RootState) => state.printSettings, isEqual);
    const pricePerSheet = useSelector((state: RootState) => state.pricePerSheet);

    useEffect(() => {
        Papa.parse(
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBE-ruc0C9QpLkIeUDgeeu4VMCqKg5JjCkLSmwGWNHPukZ9s5yVxoIiPTfjrT-ViljzZIm9s7X6fcC/pub?gid=1059440840&single=true&output=csv",
            {
                header: true,
                download: true,
                skipEmptyLines: true,
                delimiter: ",",
                complete: (results: ParseResult<Dimensions>) => {
                    setPapersDimensions(results.data);
                },
            }
        );
    }, []);

    const data = useMemo<Array<PaperRecord>>(() => {
        const finder = arrangementFinder
            ? createMarginAwareArrangementFinder(arrangementFinder, printSettings)
            : null;
        return papersDimensions.map((paperDimensions) => {
            return {
                paperDimensions,
                booksArrangementInPaper:
                    bookDimensions && finder ? finder(paperDimensions, bookDimensions) : [[]],
            };
        });
    }, [papersDimensions, bookDimensions, arrangementFinder, printSettings]);

    const columns = useMemo<MRT_ColumnDef<PaperRecord, any>[]>(
        () => [
            {
                id: "paperName",
                header: "Name",
                size: 100,
                accessorFn: (row) => matchPaperName(row.paperDimensions) ?? "\u2014",
            },
            {
                accessorKey: "paperDimensions.width",
                header: "Width",
                size: 80,
            },
            {
                accessorKey: "paperDimensions.height",
                header: "Height",
                size: 80,
            },
            {
                id: "booksPerSheet",
                header: "Books",
                size: 70,
                accessorFn: (row) => sumBy(row.booksArrangementInPaper, size),
            },
            {
                accessorFn: (row) =>
                    sumBy(row.booksArrangementInPaper, size) / (row.paperDimensions.width * row.paperDimensions.height),
                id: "bookDensity",
                header: "Utilization",
                size: 80,
                Cell: ({cell}) => (
                    <span>
                        {bookDimensions ? round(bookDimensions.width * bookDimensions.height * cell.getValue<number>() * 100, 2) : 0}%
                    </span>
                ),
            },
            {
                id: "wasteArea",
                header: "Waste (cm\u00B2)",
                size: 100,
                accessorFn: (row) => {
                    const paperArea = row.paperDimensions.width * row.paperDimensions.height;
                    const booksCount = sumBy(row.booksArrangementInPaper, size);
                    const bookArea = bookDimensions ? bookDimensions.width * bookDimensions.height : 0;
                    return round(paperArea - booksCount * bookArea, 2);
                },
            },
            ...(pricePerSheet != null
                ? [{
                    id: "costPerBook",
                    header: "Cost/Book",
                    size: 90,
                    accessorFn: (row: PaperRecord) => {
                        const booksCount = sumBy(row.booksArrangementInPaper, size);
                        return booksCount > 0 ? round(pricePerSheet / booksCount, 3) : null;
                    },
                    Cell: ({cell}: { cell: any }) => {
                        const val = cell.getValue();
                        return <span>{val != null ? Number(val).toFixed(3) : "\u2014"}</span>;
                    },
                } as MRT_ColumnDef<PaperRecord, any>]
                : []),
        ],
        [bookDimensions, pricePerSheet]
    );

    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

    const table = useMaterialReactTable({
        columns,
        data,
        defaultColumn: {
            minSize: 10,
            size: 50,
        },
        initialState: {
            sorting: [
                {
                    id: "bookDensity",
                    desc: true,
                },
            ],
        },
        getRowId: (row) => JSON.stringify(row.paperDimensions),
        enableRowSelection: true,
        enableMultiRowSelection: false,
        positionToolbarAlertBanner: "none",
        state: {
            rowSelection,
        },
        onRowSelectionChange: (updater) => {
            if (isFunction(updater)) {
                setRowSelection(updater(rowSelection));
            } else {
                setRowSelection(updater);
            }
        },
    });

    useEffect(() => {
        Object.entries(rowSelection).forEach(([key, value]) => {
            if (value) {
                const paperDimensions = JSON.parse(key);
                const booksArrangementInPaper =
                    data.find((paperRecord) => isEqual(paperRecord.paperDimensions, paperDimensions))
                        ?.booksArrangementInPaper || [];
                dispatch(setSelectedPaperRecord({paperDimensions, booksArrangementInPaper}));
            }
        });
    }, [rowSelection, data, dispatch]);

    return <MaterialReactTable table={table}/>;
};
