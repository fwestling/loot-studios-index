import React, { useState } from "react";
import { Loot, RawLoot, isErrorLoot } from "./loot.types";

import data from "../../data.json";

const rawData = data.map(({ minis, ...loot }) => ({
  ...loot,
  minis: minis.map((mini, index) => ({
    ...mini,
    id: `${loot.collection}-${loot.date}-${loot.name}-${index}`,
  })),
})) as RawLoot[];
const goodData = rawData.filter((loot) => !isErrorLoot(loot)) as Loot[];
export type Filter = {
  roles?: string[];
  races?: string[];
  sizes?: string[];
  iclasses?: string[];
  collections?: string[];
};

export interface IDataContext {
  loots: Loot[];
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}

export const DataContext = React.createContext<IDataContext>({
  loots: [],
  filter: {},
  setFilter: () => {
    console.warn("Not implemented");
  },
});

interface DataProviderProps {
  children: React.ReactNode;
}

const DataProvider = ({ children }: DataProviderProps) => {
  const [loots] = useState<Loot[]>(goodData ?? []);
  const [filter, setFilter] = useState<Filter>({});

  return (
    <DataContext.Provider value={{ loots, filter, setFilter }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
