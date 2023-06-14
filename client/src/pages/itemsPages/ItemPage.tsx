import itemPageStyles from "./ItemPage.module.scss";

import {
  TelegramShareButton,
  TelegramIcon,
  ViberShareButton,
  ViberIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";

import { FC, HTMLAttributes, Key, useEffect, useState } from "react";
import { useDataStore } from "../../hooks/useDataStore";

import { TypeVariant } from "../../types/furnitureTypes";

import cloudinary from "cloudinary-core";

import { useParams } from "react-router-dom";

interface ItemPageProps extends HTMLAttributes<HTMLDivElement> {
  type: TypeVariant;
}

const ItemPage: FC<ItemPageProps> = ({ type }) => {
  const { id } = useParams();
  const url: string = window.location.href;

  // @ts-ignore
  const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: "dikpympgh" });

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { dataOne, fetchFurnitureById } = useDataStore();
  useEffect(() => {
    id &&
      fetchFurnitureById(`/api/furniture/${id}`)
        .then(() => {
          setIsLoaded(true);
        })
        .catch((error) => {
          console.error("Error fetching furniture:", error);
        });
  }, []);

  return (
    <main className={itemPageStyles.item__page}>
      <section className={itemPageStyles.images}>
        {isLoaded &&
          dataOne.images.map((obj: string, index: Key) => (
            <img src={cloudinaryCore.url(obj)} alt={dataOne.name} key={index} />
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
