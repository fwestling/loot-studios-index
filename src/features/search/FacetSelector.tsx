import React from "react";
import { useFilter } from "../data/hooks";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FacetItem from "./FacetItem";
import { Virtuoso } from "react-virtuoso";
import { Filter } from "../data/provider";

type Props = {
  data: { label: string; count: number }[];
  title: string;
  filter: keyof Filter;
};

const FacetSelector = ({ data, title, filter }: Props) => {
  const [filters, setFilters] = useFilter();
  const [open, setOpen] = React.useState(false);

  const handleClick = React.useCallback(() => setOpen((o) => !o), []);

  return (
    <React.Fragment>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout={"auto"} unmountOnExit>
        <Virtuoso
          data={data.sort((a, b) => b.count - a.count)}
          style={{ height: 200, flex: 1 }}
          itemContent={(index, { label, count }) => (
            <FacetItem
              key={index}
              label={label}
              count={count}
              defaultValue={(filters[filter] ?? []).includes(label)}
              onSelect={() =>
                setFilters((old) => ({
                  ...old,
                  [filter]: [...(old[filter] ?? []), label],
                }))
              }
              onDeselect={() =>
                setFilters((old) => ({
                  ...old,
                  [filter]: (old[filter] ?? []).filter((r) => r !== label),
                }))
              }
            />
          )}
        />
      </Collapse>
    </React.Fragment>
  );
};

export default FacetSelector;
