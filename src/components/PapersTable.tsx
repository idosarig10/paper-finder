import { useEffect, useMemo, useState } from "react";
import Papa, { ParseResult } from "papaparse";
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import calculate from "../utils/FixedAlignmentArranger";
import { EventEmitter } from "stream";
import Size from "../interfaces/Size";

interface PaperSize {
  width: number;
  height: number;
}

interface PaperRecord {
  width: number;
  height: number;
  paperArrangement: Array<boolean>;
}

export const PapersTable = ({ emitter }: { emitter: EventEmitter }) => {
  const [paperSizes, setPaperSizes] = useState<PaperSize[]>([]);
  const [bookSize, setBookSize] = useState<Size>({ width: 50, height: 50 });

  useEffect(() => {
    const handleBookSizeChange = (newBookSize: Size) => {
      setBookSize(newBookSize);
    };

    emitter.on("bookSizeChanged", handleBookSizeChange);

    return () => {
      emitter.off("bookSizeChanged", handleBookSizeChange);
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
        complete: (results: ParseResult<PaperSize>) => {
          setPaperSizes(results.data);
        },
      }
    );
  }, []);

  const data = useMemo<PaperRecord[]>(() => {
    return paperSizes.map<PaperRecord>((paperSize) => {
      return {
        ...paperSize,
        paperArrangement: calculate(paperSize.width, paperSize.height, bookSize.width, bookSize.height),
      };
    });
  }, [paperSizes, bookSize]);

  const columns = useMemo<MRT_ColumnDef<PaperRecord>[]>(
    () => [
      {
        accessorKey: "width",
        header: "Width",
      },
      {
        accessorKey: "height",
        header: "Height",
      },
      {
        accessorKey: "paperArrangement",
        header: "Utilization",
        Cell: ({ cell }) => (
          <span>
            {((cell.row.original.paperArrangement.length * bookSize.width * bookSize.height) /
              (cell.row.original.width * cell.row.original.height)) *
              100 +
              "%"}
          </span>
        ),
        sortingFn: (rowA, rowB) => {
          const utilizationA =
            (rowA.original.paperArrangement.length * bookSize.width * bookSize.height) /
            (rowA.original.width * rowA.original.height);
          const utilizationB =
            (rowB.original.paperArrangement.length * bookSize.width * bookSize.height) /
            (rowB.original.width * rowB.original.height);
          return utilizationA - utilizationB;
        },
      },
    ],
    [bookSize]
  );

  const [rowSelection, setRowSelection] = useState({});

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
          id: "paperArrangement",
          desc: true,
        },
      ],
    },
    getRowId: (row) => row.width.toString() + "x" + row.height.toString(),
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    positionToolbarAlertBanner: "none",
  });

  useEffect(() => {
    Object.entries(rowSelection).forEach(([key, isSelected]) => {
      if (isSelected) {
        const [width, height] = key.split("x").map(Number);
        emitter.emit("selectedPaperRecordChanged", { width, height });
      }
    });
  }, [rowSelection, emitter]);

  return <MaterialReactTable table={table} />;
};
