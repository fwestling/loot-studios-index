import { useContext } from "react";
import { DataContext, IDataContext } from "./provider";
import { DecoratedMini } from "./loot.types";

export const useLoots = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context.loots;
};

export const useFilter = () => {
  const { filter, setFilter } = useContext(DataContext);
  return [filter, setFilter] as const;
};

export const useMinis = (): DecoratedMini[] => {
  const loots = useLoots();
  return loots
    .map(({ minis, ...loot }) =>
      minis.map((mini) => ({
        ...mini,
        loot,
      }))
    )
    .flat();
};

export const useFilteredMinis = (
  exclude?: "collections" | "role" | "race" | "size" | "iclass"
) => {
  const minis = useMinis();
  const [filter] = useFilter();
  return minis.filter(
    (mini) =>
      ((filter.collections ?? []).length === 0 ||
        exclude === "collections" ||
        (filter.collections ?? []).includes(mini.loot.collection)) &&
      ((filter.roles ?? []).length === 0 ||
        exclude === "role" ||
        (filter.roles ?? []).includes(mini.role)) &&
      ((filter.races ?? []).length === 0 ||
        exclude === "race" ||
        (filter.races ?? []).includes(mini.race)) &&
      ((filter.sizes ?? []).length === 0 ||
        exclude === "size" ||
        (filter.sizes ?? []).includes(mini.size)) &&
      ((filter.iclasses ?? []).length === 0 ||
        exclude === "iclass" ||
        (filter.iclasses ?? []).includes(mini.iclass))
  );
};

export const useSearchedMinis = (search: string) => {
  const minis = useFilteredMinis();
  return minis.filter(
    (mini) =>
      mini.iname.toLowerCase().includes(search.toLowerCase()) ||
      mini.loot.collection.toLowerCase().includes(search.toLowerCase())
  );
};

export const useCollections = () => {
  const loots = useLoots();
  const minis = useFilteredMinis("collections");
  return loots
    .map((loot) => loot.collection.replace("urls\\", ""))
    .filter((x) => x)
    .map((collection, _i, self) => ({
      label: collection,
      count: self.filter((x) => x === collection).length,
    }))
    .filter(
      (x, index, arr) => arr.findIndex((y) => y.label === x.label) === index
    );
};

export const useRoles = () => {
  const minis = useFilteredMinis("role");
  return minis
    .map(({ role }) => role)
    .filter((x) => x)
    .map((role, _i, arr) => ({
      label: role,
      count: arr.filter((x) => x === role).length,
    }))
    .filter(
      (x, index, arr) => arr.findIndex((y) => y.label === x.label) === index
    );
};

export const useRaces = () => {
  const minis = useFilteredMinis("race");
  return minis
    .map(({ race }) => race)
    .filter((x) => x)
    .map((race, _i, arr) => ({
      label: race,
      count: arr.filter((x) => x === race).length,
    }))
    .filter(
      (x, index, arr) => arr.findIndex((y) => y.label === x.label) === index
    );
};

export const useSizes = () => {
  const minis = useFilteredMinis("size");
  return minis
    .map(({ size }) => size)
    .filter((x) => x)
    .map((size, _i, arr) => ({
      label: size,
      count: arr.filter((x) => x === size).length,
    }))
    .filter(
      (x, index, arr) => arr.findIndex((y) => y.label === x.label) === index
    );
};

export const useClasses = () => {
  const minis = useFilteredMinis("iclass");
  return minis
    .map(({ iclass }) => iclass)
    .filter((x) => x)
    .map((iclass, _i, arr) => ({
      label: iclass,
      count: arr.filter((x) => x === iclass).length,
    }))
    .filter(
      (x, index, arr) => arr.findIndex((y) => y.label === x.label) === index
    );
};
