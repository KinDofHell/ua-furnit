import itemSectionStyles from "./ItemSection.module.scss";

import { FC, HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

import { TypeVariant } from "../../../types/furnitureTypes";
import Button from "../buttons/Button";

interface ItemSectionProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  type: TypeVariant;
  coverImage?: string;
  rating: number;
  isEditable?: boolean;
  refreshData: () => void;
  openLoading: () => void;
  closeLoading: () => void;
}

const ItemSection: FC<ItemSectionProps> = ({
  id,
  type,
  coverImage,
  isEditable,
  refreshData,
  openLoading,
  closeLoading,
}) => {
  const handleDelete = async () => {
    const confirmed = window.confirm("Ви дійсно бажаєте видалити?");
    if (confirmed) {
      try {
        openLoading();
        const response = await axiosInstance.delete(`/api/furniture/${id}`);
        refreshData();
        closeLoading();
      } catch (error) {
        console.error("Error deleting furniture:", error);
      }
    }
  };

  return (
    <article
      className={itemSectionStyles.item__section}
      style={{
        backgroundImage: `url(${coverImage})`,
      }}
    >
      <Link to={`/furniture/${type}/${id}`}></Link>
      {isEditable && (
        <Button
          label="Видалити"
          isDanger={true}
          className={itemSectionStyles.btnDelete}
          onClick={handleDelete}
        />
      )}
    </article>
  );
};

export default ItemSection;
