import itemPageStyles from "./ItemPage.module.scss";

import { TelegramShareButton, TelegramIcon } from "react-share";

import { FC, HTMLAttributes } from "react";
import { useParams } from "react-router-dom";

type TypeVariant = "kitchen" | "bathroom" | "bedroom";

interface ItemPageProps extends HTMLAttributes<HTMLDivElement> {
  type: TypeVariant;
}

const ItemPage: FC<ItemPageProps> = ({ type }) => {
  const { id } = useParams();
  const url: string = window.location.href;

  return (
    <main className={itemPageStyles.item__page}>
      <TelegramShareButton url={url} title={"See this one!"}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
    </main>
  );
};

export default ItemPage;
