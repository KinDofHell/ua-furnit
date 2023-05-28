import itemsPageStyles from "./ItemsPage.module.scss";

import { FC, HTMLAttributes } from "react";
import ItemSection from "../../components/ui/itemsComponents/ItemSection";

type TypeVariant = "kitchen" | "bathroom" | "bedroom";

interface ItemsPageProps extends HTMLAttributes<HTMLDivElement> {
  type: TypeVariant;
}

const ItemsPage: FC<ItemsPageProps> = ({ type }) => {
  return (
    <main className={itemsPageStyles.items__page}>
      <section className={itemsPageStyles.items}>
        <ItemSection id="sadfasdf" rating={10} type={type} />
        <ItemSection id="sadfasdf" rating={10} type={type} />
        <ItemSection id="sadfasdf" rating={10} type={type} />
        <ItemSection id="sadfasdf" rating={10} type={type} />
        <ItemSection id="sadfasdf" rating={10} type={type} />
      </section>
    </main>
  );
};

export default ItemsPage;
