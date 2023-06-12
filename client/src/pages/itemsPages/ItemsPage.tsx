import itemsPageStyles from "./ItemsPage.module.scss";
import "../../globalStyles/paginationStyle.scss";

import { FC, HTMLAttributes, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { Paginate, handlePageClick } from "../../utils/Paginate";
import { useDataStore } from "../../hooks/useDataStore";

import { TypeVariant } from "../../types/furnitureTypes";

import ItemsSection from "../../components/ui/itemsComponents/ItemsSection";
import Button from "../../components/ui/buttons/Button";
import ImageModal from "../../components/modal/ImageModal";

interface ItemsPageProps extends HTMLAttributes<HTMLDivElement> {
  type: TypeVariant;
  itemsPerPage: number;
}

const ItemsPage: FC<ItemsPageProps> = ({ type, itemsPerPage }) => {
  const { data, fetchData } = useDataStore();

  useEffect(() => {
    fetchData("/api/furniture/").then((res) => console.log("Data loaded!"));
  }, []);

  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentItems, pageCount] = Paginate(data, itemsPerPage, itemOffset);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const handleImageAdd = (newImages: FileList | File[]) => {
    const fileList = Array.from(newImages) as File[];
    setImages((prevImages) => [...prevImages, ...fileList]);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const refreshData = () => {
    fetchData("/api/furniture").then(() => console.log("Data Loaded!"));
  };

  return (
    <main className={itemsPageStyles.items__page}>
      <ItemsSection
        className={itemsPageStyles.items}
        currentItems={currentItems}
        type={type}
      />
      <Button
        label="+"
        className={itemsPageStyles.add__btn}
        onClick={openModal}
      />
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        onImageAdd={handleImageAdd}
        refreshData={refreshData}
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
