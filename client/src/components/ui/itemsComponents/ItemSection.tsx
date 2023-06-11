import itemSectionStyles from "./ItemSection.module.scss";

import kitchenExample from "../../../assets/imgs/kitchenExample.png";

import { FC, HTMLAttributes } from "react";
import { Link } from "react-router-dom";

import { TypeVariant } from "../../../types/furnitureTypes";

interface ItemSectionProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  type: TypeVariant;
  coverImage?: string;
  rating: number;
  isEditable?: boolean;
}

const ItemSection: FC<ItemSectionProps> = ({
  id,
  type,
  coverImage,
  isEditable,
}) => {
  return (
    <article
      className={itemSectionStyles.item__section}
      style={{
        backgroundImage: `url(${kitchenExample})`,
      }}
    >
      <Link to={`/furniture/${type}/${id}`}></Link>
    </article>
  );
};

export default ItemSection;
