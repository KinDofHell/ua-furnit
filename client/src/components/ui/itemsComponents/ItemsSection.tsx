import { FC, HTMLAttributes, Key, useEffect, useState } from "react";
import ItemSection from "./ItemSection";

type TypeVariant = "kitchen" | "bathroom" | "bedroom";
type CurrentItemType = { id: string; rating: number };
type CurrentItemsType = Array<CurrentItemType>;

interface ItemsSectionProps extends HTMLAttributes<HTMLDivElement> {
  type: TypeVariant;
  currentItems: CurrentItemsType;
  className?: string;
}

const ItemsSection: FC<ItemsSectionProps> = ({
  type,
  currentItems,
  className,
}) => {
  return (
    <>
      <section className={className}>
        {currentItems.map((obj: CurrentItemType, index: Key) => (
          <ItemSection
            id={obj.id}
            rating={obj.rating}
            type={type}
            key={index}
          />
        ))}
      </section>
    </>
  );
};

export default ItemsSection;
