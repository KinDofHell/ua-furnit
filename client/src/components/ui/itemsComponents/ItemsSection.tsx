import { FC, HTMLAttributes, Key } from "react";

import {
  TypeVariant,
  CurrentItemsType,
  CurrentItemType,
} from "../../../types/furnitureTypes";

import ItemSection from "./ItemSection";

import cloudinary from "cloudinary-core";

interface ItemsSectionProps extends HTMLAttributes<HTMLDivElement> {
  type: TypeVariant;
  currentItems: CurrentItemsType;
  className?: string;
  refreshData: () => void;
  openLoading: () => void;
  closeLoading: () => void;
}

const ItemsSection: FC<ItemsSectionProps> = ({
  type,
  currentItems,
  className,
  refreshData,
  openLoading,
  closeLoading,
}) => {
  // @ts-ignore
  const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: "dikpympgh" });

  return (
    <>
      <section className={className}>
        {currentItems.map((obj: CurrentItemType, index: Key) => (
          <ItemSection
            id={obj._id}
            rating={obj.rating}
            type={type}
            key={index}
            coverImage={cloudinaryCore.url(obj.coverImage)}
            isEditable={true}
            refreshData={refreshData}
            openLoading={openLoading}
            closeLoading={closeLoading}
          />
        ))}
      </section>
    </>
  );
};

export default ItemsSection;
