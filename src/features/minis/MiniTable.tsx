import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import React from "react";
import TextField from "@mui/material/TextField";
import { useSearchedMinis } from "../data/hooks";
import { GridColDef } from "@mui/x-data-grid";
import { DecoratedMini } from "../data/loot.types";
import { useOpenPager } from "../pager/hooks";

//   role: string;
//   race: string;
//   iclass: string;
//   size: string;
//   iname: string;
//   img: string;

const useColumns = (
  clickHandler: (mini: DecoratedMini) => void
): GridColDef<DecoratedMini>[] => [
  {
    field: "iname",
    headerName: "Name",
    flex: 1,
    renderCell: (params) => (
      <a href={params.row.loot.url} target="_blank" rel="noreferrer">
        {params.value}
      </a>
    ),
  },
  { field: "race", headerName: "Race", flex: 1 },
  { field: "iclass", headerName: "Class", flex: 1 },
  { field: "role", headerName: "Role", flex: 1 },
  {
    field: "img",
    headerName: "Image",
    width: 128,
    renderCell: (params) => (
      <Box
        component="img"
        onClick={() => clickHandler(params.row)}
        src={params.value}
        alt={params.row.iname}
        style={{ width: 128, height: 128 }}
      />
    ),
  },
];

const MiniTable = () => {
  const [search, setSearch] = React.useState<string>("");
  const minis = useSearchedMinis(search);

  const openPager = useOpenPager();

  const columns = useColumns((mini) =>
    openPager(
      minis.findIndex((m) => m.id === mini.id),
      minis
    )
  );

  return (
    <Box
      sx={{ flex: 2, display: "flex", flexDirection: "column", height: "100%" }}
    >
      <TextField
        id="search"
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DataGrid
        rows={minis}
        columns={columns}
        getRowId={(row) => row.id}
        rowHeight={128}
      />
    </Box>
  );
};

export default MiniTable;
