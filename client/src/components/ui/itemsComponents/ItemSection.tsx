import itemSectionStyles from "./ItemSection.module.scss";
import kitchenExample from "../../../assets/imgs/kitchenExample.png";
import bathroomExample from "../../../assets/imgs/bathroomExample.jpg";
import bedroomExample from "../../../assets/imgs/bedroomExample.jpg";

import { FC, HTMLAttributes, useEffect, useState } from "react";
import { Link } from "react-router-dom";

type TypeVariant = "kitchen" | "bathroom" | "bedroom";

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
        backgroundImage: `url(${
          coverImage
            ? coverImage
            : type === "kitchen"
            ? kitchenExample
            : type === "bathroom"
            ? bathroomExample
            : bedroomExample
        })`,
      }}
    >
      <Link to={`/furniture/${type}/${id}`}></Link>
    </article>
  );
};

export default ItemSection;
