import React from "react";
import { PagerContext } from "./provider";

export const useOpenPager = () => {
  const { open } = React.useContext(PagerContext);
  return open;
};

export const useClosePager = () => {
  const { close } = React.useContext(PagerContext);
  return close;
};
