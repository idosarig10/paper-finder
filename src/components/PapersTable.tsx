import { useEffect, useMemo, useState } from "react";
import Papa, { ParseResult } from "papaparse";
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from "material-react-table";

interface Paper {
  width: number;
  height: number;
  utilization: number;
}

export const PapersTable = (onSelectedPaperSizeChange: {
  onSelectedPaperSizeChange: (newSelectedPaperSize: { width: number; height: number }) => void;
}) => {
  const [data, setData] = useState<Paper[]>([]);

  useEffect(() => {
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRhZfaAtRwlyqlAvA9QKGtjSj25_VGj3_-MvvnXaspQDQypyUv6zqjeKf78eeC1E6MhLBaWktgTL2h1/pub?output=csv",
      {
        header: true,
        download: true,
        skipEmptyLines: true,
        delimiter: ",",
        complete: (results: ParseResult<Paper>) => {
          setData(results.data);
        },
      }
    );
  }, []);

  const columns = useMemo<MRT_ColumnDef<Paper>[]>(
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
        accessorKey: "utilization",
        header: "Utilization",
        Cell: ({ cell }) => (
          <span>{cell.getValue<number>() === undefined ? undefined : cell.getValue<number>() + "%"}</span>
        ),
      },
    ],
    []
  );

  const [rowSelection, setRowSelection] = useState({});

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: {
      sorting: [
        {
          id: "utilization",
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
        onSelectedPaperSizeChange.onSelectedPaperSizeChange({ width, height });
      }
    });
  }, [onSelectedPaperSizeChange, rowSelection]);

  return <MaterialReactTable table={table} />;
};
