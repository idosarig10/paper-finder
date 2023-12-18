import { useEffect, useMemo, useState } from "react";
import Papa, { ParseResult } from "papaparse";
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { EventEmitter } from "stream";
import Dimensions from "../interfaces/Dimensions";
import _ from "lodash";
import PaperRecord from "../interfaces/PaperRecord";

interface ArrangementFinder {
  (paperDimensions: Dimensions, bookDimensions: Dimensions): Array<Array<boolean>>;
}

export const PapersTable = ({ emitter }: { emitter: EventEmitter }) => {
  const [papersDimensions, setPapersDimensions] = useState<Dimensions[]>([]);
  const [bookDimensions, setBookDimensions] = useState<Dimensions>();
  const [arrangementFinder, setArrangementFinder] = useState<ArrangementFinder>();

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
    const handleArrangementFinderChange = (newArrangementFinder: ArrangementFinder) => {
      setArrangementFinder(() => newArrangementFinder);
    };

    emitter.on("arrangementFinderChanged", handleArrangementFinderChange);

    return () => {
      emitter.off("arrangementFinderChanged", handleArrangementFinderChange);
    };
  }, [emitter]);

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
    return papersDimensions.map((paperDimensions) => {
      return {
        paperDimensions,
        booksArrangementInPaper:
          bookDimensions && arrangementFinder ? arrangementFinder(paperDimensions, bookDimensions) : [[]],
      };
    });
  }, [papersDimensions, bookDimensions, arrangementFinder]);

  const columns = useMemo<MRT_ColumnDef<PaperRecord, number>[]>(
    () => [
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
        accessorFn: (row) =>
          _.sumBy(row.booksArrangementInPaper, _.size) / (row.paperDimensions.width * row.paperDimensions.height),
        id: "bookDensity",
        header: "Utilization",
        size: 80,
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
