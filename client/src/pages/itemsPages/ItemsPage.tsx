import itemsPageStyles from "./ItemsPage.module.scss";
import "../../globalStyles/paginationStyle.scss";

import {FC, HTMLAttributes, useContext, useEffect, useState} from "react";
import ReactPaginate from "react-paginate";

import {Paginate, handlePageClick} from "../../utils/Paginate";
import {useDataStore} from "../../hooks/useDataStore";

import {TypeVariant} from "../../types/furnitureTypes";

import ItemsSection from "../../components/ui/itemsComponents/ItemsSection";
import Button from "../../components/ui/buttons/Button";
import ImageModal from "../../components/modal/ImageModal";
import Loading from "../../components/ui/loading/Loading";
import {AuthContext} from "../../layouts/authContext/AuthContext";

interface ItemsPageProps extends HTMLAttributes<HTMLDivElement> {
    type: TypeVariant;
    itemsPerPage: number;
}

const ItemsPage: FC<ItemsPageProps> = ({type, itemsPerPage}) => {
    const {data, fetchData} = useDataStore();
    const {isAuthenticated, isAdmin} = useContext(AuthContext);

    useEffect(() => {
        fetchData(`/api/furniture/category/${type}`).then((res) =>
            console.log("Data loaded!")
        );
    }, [type]);

    const [itemOffset, setItemOffset] = useState<number>(0);
    const [currentItems, pageCount] = Paginate(data, itemsPerPage, itemOffset);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [images, setImages] = useState<File[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const openLoading = () => {
        setIsLoading(true);
    };
    const closeLoading = () => {
        setIsLoading(false);
    };

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
        fetchData(`/api/furniture/category/${type}`).then(() =>
            console.log("Data Loaded!")
        );
    };

    return (
        <main className={itemsPageStyles.items__page}>
            <ItemsSection
                className={itemsPageStyles.items}
                currentItems={currentItems}
                type={type}
                refreshData={refreshData}
                openLoading={openLoading}
                closeLoading={closeLoading}
                isEditing={isAdmin}
            />
            {isAdmin && (
                <Button
                    label="+"
                    className={itemsPageStyles.add__btn}
                    onClick={openModal}
                />
            )}
            {isAuthenticated && (
                <ImageModal
                    isOpen={modalIsOpen}
                    onClose={closeModal}
                    onImageAdd={handleImageAdd}
                    refreshData={refreshData}
                    openLoading={openLoading}
                    closeLoading={closeLoading}
                />
            )}
            {isLoading && <Loading/>}
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
