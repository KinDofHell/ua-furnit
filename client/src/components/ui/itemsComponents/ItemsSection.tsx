import { FC, HTMLAttributes, Key } from "react";

import {
  TypeVariant,
  CurrentItemsType,
  CurrentItemType,
} from "../../../types/furnitureTypes";

import ItemSection from "./ItemSection";

interface ItemsSectionProps extends HTMLAttributes<HTMLDivElement> {
  type: TypeVariant;
  currentItems: CurrentItemsType;
  className?: string;
  coverImage: string;
}

const ItemsSection: FC<ItemsSectionProps> = ({
  type,
  currentItems,
  className,
  coverImage,
}) => {
  return (
    <>
      <section className={className}>
        {currentItems.map((obj: CurrentItemType, index: Key) => (
          <ItemSection
            id={obj._id}
            rating={obj.rating}
            type={type}
            key={index}
            coverImage={obj.coverImage}
          />
        ))}
      </section>
    </>
  );
};

export default ItemsSection;
