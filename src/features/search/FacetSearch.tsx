import Box from "@mui/material/Box";
import React from "react";
import {
  useClasses,
  useCollections,
  useFilter,
  useRaces,
  useRoles,
  useSizes,
} from "../data/hooks";
import List from "@mui/material/List";
import FacetSelector from "./FacetSelector";
import Button from "@mui/material/Button";

const FacetSearch = () => {
  const [_, setFilters] = useFilter();
  const races = useRaces();
  const classes = useClasses();
  const roles = useRoles();
  const sizes = useSizes();
  const collections = useCollections();

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Button variant="outlined" onClick={() => setFilters({})}>
        Clear filters
      </Button>
      <List sx={{ width: "100%" }}>
        <FacetSelector data={races} filter="races" title="Race" />
        <FacetSelector data={classes} filter="iclasses" title="Class" />
        <FacetSelector data={roles} filter="roles" title="Role" />
        <FacetSelector data={sizes} filter="sizes" title="Size" />
        <FacetSelector data={collections} filter="collections" title="Loot" />
      </List>
    </Box>
  );
};

export default FacetSearch;
