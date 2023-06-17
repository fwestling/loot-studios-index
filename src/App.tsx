import Box from "@mui/material/Box";
import React from "react";
import "./App.css";
import DataProvider from "./features/data/provider";
import ColoredThemeProvider from "./features/theme/provider";
import FacetSearch from "./features/search/FacetSearch";
import MiniTable from "./features/minis/MiniTable";

function App() {
  return (
    <ColoredThemeProvider>
      <DataProvider>
        <Box sx={{ display: "flex" }}>
          <FacetSearch />
          <MiniTable />
        </Box>
      </DataProvider>
    </ColoredThemeProvider>
  );
}

export default App;
