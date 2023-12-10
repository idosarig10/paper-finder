import { useEffect, useMemo, useState } from 'react';
import Papa, { ParseResult } from "papaparse";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowSelectionState,
} from 'material-react-table';


interface Paper {
  width: number;
  height: number;
  utilization: number;
}

// const data = [
//   {
//     width: 1,
//     height: 2,
//     utilization: 30
//   },
// ];

export const PapersTable = () => {
  const [data, setData] = useState<Paper[]>([]);

  useEffect(() => {
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vRhZfaAtRwlyqlAvA9QKGtjSj25_VGj3_-MvvnXaspQDQypyUv6zqjeKf78eeC1E6MhLBaWktgTL2h1/pub?output=csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      delimiter: ",",
      complete: (results: ParseResult<Paper>) => {
        setData(results.data)
      },
    })}, []);

  const columns = useMemo<MRT_ColumnDef<Paper>[]>(
    () => [
      {
        accessorKey: 'width',
        header: 'Width',
      },
      {
        accessorKey: 'height',
        header: 'Height',
      },
      {
        accessorKey: 'utilization',
        header: 'Utilization',
      },
    ],
    [],
  );

  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const table = useMaterialReactTable({
    columns,
    data,
    getRowId: (row) => row.width.toString() + "x" + row.height.toString,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () =>
        setRowSelection((prev) => ({
          [row.id]: !prev[row.id],
        })),
      selected: rowSelection[row.id],
      sx: {
        cursor: 'pointer',
      },
    }),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    positionToolbarAlertBanner: 'none',
  });
  return <MaterialReactTable table={table} />;
};
