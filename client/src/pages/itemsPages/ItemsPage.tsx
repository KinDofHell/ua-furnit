import itemsPageStyles from "./ItemsPage.module.scss";
import "../../globalStyles/paginationStyle.scss";

import { FC, HTMLAttributes, useState } from "react";
import ReactPaginate from "react-paginate";

import { Paginate, handlePageClick } from "../../util/Paginate";

import ItemsSection from "../../components/ui/itemsComponents/ItemsSection";

type TypeVariant = "kitchen" | "bathroom" | "bedroom";
type CurrentItemType = object;
type CurrentItemsType = Array<CurrentItemType>;

interface ItemsPageProps extends HTMLAttributes<HTMLDivElement> {
  type: TypeVariant;
  itemsPerPage: number;
}

const ItemsPage: FC<ItemsPageProps> = ({ type, itemsPerPage }) => {
  const data: CurrentItemsType = [
    { id: "afsdfas", rating: 10 },
    { id: "afsdfas", rating: 10 },
    {
      id: "afsdfas",
      rating: 10,
    },
    { id: "afsdfas", rating: 10 },
    { id: "afsdfas", rating: 10 },
    { id: "afsdfas", rating: 10 },
    {
      id: "afsdfas",
      rating: 10,
    },
    { id: "a123123s", rating: 10 },
    { id: "asdfsdasdasdasdas", rating: 10 },
  ];
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentItems, pageCount] = Paginate(data, itemsPerPage, itemOffset);

  return (
    <main className={itemsPageStyles.items__page}>
      <ItemsSection
        className={itemsPageStyles.items}
        currentItems={currentItems}
        type={type}
      />
      <ReactPaginate
        nextLabel=">"
        previousLabel="<"
        onPageChange={(e) =>
          handlePageClick(e, setItemOffset, itemsPerPage, data.length)
        }
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        pageClassName="page_item"
        pageLinkClassName="page_link"
        previousClassName="page_item"
        previousLinkClassName="page_link"
        nextClassName="page_item"
        nextLinkClassName="page_link"
        breakLabel="..."
        breakClassName="page_item"
        breakLinkClassName="page_link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </main>
  );
};

export default ItemsPage;