import itemPageStyles from "./ItemPage.module.scss";

import kitchenExample from "../../assets/imgs/kitchenExample.png";
import bathroomExample from "../../assets/imgs/bathroomExample.jpg";
import bedroomExample from "../../assets/imgs/bedroomExample.jpg";

import {
  TelegramShareButton,
  TelegramIcon,
  ViberShareButton,
  ViberIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";

import { FC, HTMLAttributes, Key } from "react";

import { TypeVariant } from "../../types/furnitureTypes";

interface ItemPageProps extends HTMLAttributes<HTMLDivElement> {
  type: TypeVariant;
}

const ItemPage: FC<ItemPageProps> = ({ type }) => {
  const url: string = window.location.href;

  const data: string[] = [kitchenExample, bathroomExample, bedroomExample];

  return (
    <main className={itemPageStyles.item__page}>
      <section className={itemPageStyles.images}>
        {data.map((obj: string, index: Key) => (
          <img src={obj} alt={obj} key={index} />
        ))}
      </section>
      <section className={itemPageStyles.share__btns}>
        <TelegramShareButton url={url} title={"Look at this!"}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <hr style={{ width: "100%", marginBottom: "4px" }} />
        <ViberShareButton url={url} title={"Look at this!"}>
          <ViberIcon size={32} round />
        </ViberShareButton>
        <hr style={{ width: "100%", marginBottom: "4px" }} />
        <FacebookShareButton url={url} title={"Look at this!"}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </section>
    </main>
  );
};

export default ItemPage;
