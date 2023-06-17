import Box from "@mui/material/Box";
import React from "react";
import {
  useClasses,
  useCollections,
  useRaces,
  useRoles,
  useSizes,
} from "../data/hooks";
import List from "@mui/material/List";
import RaceSelector from "./RaceSelector";

const FacetSearch = () => {
  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <List>
        <RaceSelector />
      </List>
    </Box>
  );
};

export default FacetSearch;
