import { useEffect, useMemo, useState } from "react";
import Papa, { ParseResult } from "papaparse";
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import calculate from "../utils/FixedAlignmentArranger";
import { EventEmitter } from "stream";
import Dimensions from "../interfaces/Dimensions";
import _ from "lodash";
import PaperRecord from "../interfaces/PaperRecord";

export const PapersTable = ({ emitter }: { emitter: EventEmitter }) => {
  const [papersDimensions, setPapersDimensions] = useState<Dimensions[]>([]);
  const [bookDimensions, setBookDimensions] = useState<Dimensions>();

  useEffect(() => {
    const handleBookDimensionsChange = (newBookDimensions: Dimensions) => {
      setBookDimensions(newBookDimensions);
    };

    emitter.on("bookDimensionsChanged", handleBookDimensionsChange);

    return () => {
      emitter.off("bookDimensionsChanged", handleBookDimensionsChange);
    };
  }, [emitter]);

  useEffect(() => {
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRhZfaAtRwlyqlAvA9QKGtjSj25_VGj3_-MvvnXaspQDQypyUv6zqjeKf78eeC1E6MhLBaWktgTL2h1/pub?output=csv",
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

  const data = useMemo<Array<PaperRecord>>(
    () =>
      papersDimensions.map((paperDimensions) => ({
        paperDimensions,
        booksArrangementInPaper: bookDimensions
          ? calculate(paperDimensions.width, paperDimensions.height, bookDimensions.width, bookDimensions.height)
          : [],
      })),
    [papersDimensions, bookDimensions]
  );
  const columns = useMemo<MRT_ColumnDef<PaperRecord, number>[]>(
    () => [
      {
        accessorKey: "paperDimensions.width",
        header: "Width",
      },
      {
        accessorKey: "paperDimensions.height",
        header: "Height",
      },
      {
        accessorFn: (row) =>
          row.booksArrangementInPaper.length / (row.paperDimensions.width * row.paperDimensions.height),
        id: "bookDensity",
        header: "Utilization",
        Cell: ({ cell }) => (
          <span>
            {bookDimensions ? _.round(bookDimensions.width * bookDimensions.height * cell.getValue() * 100, 2) : 0}%
          </span>
        ),
      },
    ],
    [bookDimensions]
  );

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const table = useMaterialReactTable({
    columns,
    data,
    defaultColumn: {
      minSize: 20,
      size: 100,
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
      if (_.isFunction(updater)) {
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
          data.find((paperRecord) => _.isEqual(paperRecord.paperDimensions, paperDimensions))
            ?.booksArrangementInPaper || [];
        emitter.emit("selectedPaperRecordChanged", { paperDimensions, booksArrangementInPaper });
      }
    });
  }, [rowSelection, emitter, data]);

  return <MaterialReactTable table={table} />;
};
