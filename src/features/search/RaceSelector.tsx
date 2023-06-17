import React from "react";
import { useFilter, useRaces } from "../data/hooks";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FacetItem from "./FacetItem";
import { Virtuoso } from "react-virtuoso";
import List from "@mui/material/List";

const RaceSelector = () => {
  const races = useRaces();
  const [_, setFilters] = useFilter();
  const [open, setOpen] = React.useState(true);

  const handleClick = React.useCallback(() => setOpen((o) => !o), []);

  return (
    <React.Fragment>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Race" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout={"auto"} unmountOnExit>
        <Virtuoso
          data={races.sort((a, b) => b.count - a.count)}
          style={{ height: 200, width: 350 }}
          itemContent={(index, { race, count }) => (
            <FacetItem
              key={index}
              label={race}
              count={count}
              onSelect={() =>
                setFilters((old) => ({
                  ...old,
                  races: [...(old.races ?? []), race],
                }))
              }
              onDeselect={() =>
                setFilters((old) => ({
                  ...old,
                  races: (old.races ?? []).filter((r) => r !== race),
                }))
              }
            />
          )}
        />
      </Collapse>
    </React.Fragment>
  );
};

export default RaceSelector;
