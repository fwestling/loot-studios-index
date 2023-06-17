import React from "react";
import { useRaces } from "../data/hooks";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import CountBadge from "./CountBadge";

type Props = {
  count: number;
  label: string;
  onSelect: () => void;
  onDeselect: () => void;
};

const FacetItem = ({ count, label, onSelect, onDeselect }: Props) => {
  const [checked, setChecked] = React.useState<boolean>(false);

  const handleToggle = React.useCallback(() => {
    const nextValue = !checked;
    setChecked(nextValue);
    if (nextValue) onSelect();
    else onDeselect();
  }, [checked]);

  return (
    <ListItem
      secondaryAction={
        <Checkbox edge="end" onChange={handleToggle} checked={checked} />
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemAvatar>
          <CountBadge count={count} />
        </ListItemAvatar>
        <ListItemText>{label}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default FacetItem;
