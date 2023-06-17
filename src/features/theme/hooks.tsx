import React from "react";
import { ColorModeContext } from "./provider";

export const useToggleMode = () => {
  const { toggleColorMode } = React.useContext(ColorModeContext);
  return toggleColorMode;
};
