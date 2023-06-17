import Box from "@mui/material/Box";
import React from "react";
import "./App.css";
import DataProvider from "./features/data/provider";
import ColoredThemeProvider from "./features/theme/provider";
import FacetSearch from "./features/search/FacetSearch";
import MiniTable from "./features/minis/MiniTable";
import PagerProvider from "./features/pager/provider";

function App(): React.ReactNode {
  return (
    <ColoredThemeProvider>
      <DataProvider>
        <PagerProvider>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: "100%",
              height: "100%",
              overflow: "auto",
            }}
          >
            <FacetSearch />
            <MiniTable />
          </Box>
        </PagerProvider>
      </DataProvider>
    </ColoredThemeProvider>
  );
}

export default App;
