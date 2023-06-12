export type TypeVariant =
  | "kitchens"
  | "wardrobes"
  | "nightstands"
  | "shelves"
  | "tables"
  | "dressers";

export type CurrentItemType = { _id: string; rating: number };
export type CurrentItemsType = Array<CurrentItemType>;
