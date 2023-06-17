export type Loot = {
  collection: string;
  date: string;
  name: string;
  url: string;
  minis: Mini[];
};

export type ErrorLoot = {
  error: string;
};

export const isErrorLoot = (loot: RawLoot): loot is ErrorLoot =>
  (loot as ErrorLoot).error !== undefined;

export type RawLoot = Loot | ErrorLoot;

export type Mini = {
  id: string;
  role: string;
  race: string;
  iclass: string;
  size: string;
  iname: string;
  img: string;
};

export type DecoratedMini = Mini & {
  loot: Omit<Loot, "minis">;
};
