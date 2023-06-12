export type TypeVariant =
  | "kitchens"
  | "wardrobes"
  | "nightstands"
  | "shelves"
  | "tables"
  | "dressers";

export type CurrentItemType = {
  _id: string;
  rating: number;
  coverImage: string;
};
export type CurrentItemsType = Array<CurrentItemType>;
