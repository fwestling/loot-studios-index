import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import React from "react";
import TextField from "@mui/material/TextField";
import { useSearchedMinis } from "../data/hooks";
import { GridColDef } from "@mui/x-data-grid";
import { DecoratedMini } from "../data/loot.types";

//   role: string;
//   race: string;
//   iclass: string;
//   size: string;
//   iname: string;
//   img: string;

const columns: GridColDef<DecoratedMini>[] = [
  { field: "iname", headerName: "Name" },
  { field: "race", headerName: "Race" },
  { field: "iclass", headerName: "Class" },
  { field: "role", headerName: "Role" },
  {
    field: "img",
    headerName: "Image",
    renderCell: (params) => (
      <img
        src={params.value}
        alt={params.value}
        style={{ width: 50, height: 50 }}
      />
    ),
  },
];

const MiniTable = () => {
  const [search, setSearch] = React.useState<string>("");
  const minis = useSearchedMinis(search);

  return (
    <Box sx={{ flex: 2, display: "flex", flexDirection: "column" }}>
      <TextField
        id="search"
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DataGrid rows={minis} columns={columns} getRowId={(row) => row.id} />
    </Box>
  );
};

export default MiniTable;
