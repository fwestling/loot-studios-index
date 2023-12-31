import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import CountBadge from "./CountBadge";

type Props = {
  count: number;
  label: string;
  defaultValue: boolean;
  onSelect: () => void;
  onDeselect: () => void;
};

const FacetItem = ({
  count,
  label,
  defaultValue,
  onSelect,
  onDeselect,
}: Props) => {
  const [checked, setChecked] = React.useState<boolean>(defaultValue);

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
      <ListItemButton onClick={handleToggle}>
        <ListItemAvatar>
          <CountBadge count={count} />
        </ListItemAvatar>
        <ListItemText>{label}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default FacetItem;
