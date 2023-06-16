import imageModalStyles from "./ImageModal.module.scss";

import { FC, Key, useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm, Controller } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";
import { useDataStore } from "../../hooks/useDataStore";

import FormContainer from "../ui/form/FormContainer";
import Button from "../ui/buttons/Button";

interface CategoriesType {
  [key: string]: any;
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageAdd: (files: File[]) => void;
  refreshData: () => void;
  openLoading: () => void;
  closeLoading: () => void;
}

interface ImageFormValues {
  images: string[] | null;
  coverImage: string | null;
  category: string;
}

const ImageModal: FC<ImageModalProps> = ({
  isOpen,
  onClose,
  refreshData,
  openLoading,
  closeLoading,
}) => {
  const { handleSubmit, control, reset } = useForm<ImageFormValues>();
  const { categories, fetchCategories } = useDataStore();

  const [isCategoriesLoad, setIsCategoriesLoad] = useState<boolean>(false);

  useEffect(() => {
    fetchCategories("/api/category/").then(() => setIsCategoriesLoad(true));
  }, []);

  const onSubmit = async (data: ImageFormValues) => {
    onClose();
    openLoading();
    const { images, coverImage, category } = data;

    const formData = new FormData();

    if (images && coverImage) images.unshift(coverImage);

    if (category) formData.append("category", category);

    if (images)
      for (let i = 0; i < images.length; i++)
        formData.append("images", images[i]);

    try {
      const response = await axiosInstance.post("/api/furniture", formData);
      console.log("Furniture created:", response.data);
      refreshData();
    } catch (error) {
      console.error("Error creating furniture:", error);
    }

    reset();
    closeLoading();
  };

  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          zIndex: 100,
        },
        content: {
          position: "static",
          display: "flex",
          justifyContent: "center",
          border: "1px solid #ccc",
          background: "#fff",
          borderRadius: "4px",
          outline: "none",
          padding: "20px",
          width: "300px",
          height: "280px",
          overflowX: "hidden",
          overflowY: "hidden",
          backgroundColor: "rgb(52, 66, 89)",
        },
      }}
    >
      <FormContainer
        title="Додати"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="category">Категорія</label>
        <Controller
          name="category"
          control={control}
          defaultValue=""
          rules={{
            required: "Це поле обов'язкове!",
            minLength: {
              value: 3,
              message: "Мінімум 3 символи!",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <select
                id="category"
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
              >
                <option value="">Оберіть категорію</option>
                {isCategoriesLoad &&
                  categories.map((obj: CategoriesType, index: Key) => (
                    <option value={obj._id} key={index}>
                      {obj.name}
                    </option>
                  ))}
              </select>
              {error && <p>{error.message}</p>}{" "}
            </div>
          )}
        />
        <label htmlFor="coverImage">Обкладинка</label>
        <Controller
          name="coverImage"
          control={control}
          defaultValue={null}
          rules={{
            required: "Обкладинка обов'язкова!",
          }}
          render={({ field }) => (
            <input
              id="coverImage"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                field.onChange(file);
              }}
              onBlur={field.onBlur}
            />
          )}
        />
        <label htmlFor="images">Інші фото</label>
        <Controller
          name="images"
          control={control}
          defaultValue={null}
          rules={{
            validate: {
              validateImages: (value) => {
                if (value && value.length === 0)
                  return "Оберіть хоча б одну картинку!";
                return true;
              },
            },
          }}
          render={({ field }) => (
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files;
                const fileList = files ? Array.from(files) : [];
                field.onChange(fileList);
              }}
              onBlur={field.onBlur}
            />
          )}
        />
        <section className={imageModalStyles.control_btns}>
          <Button label="Додати" type="submit" isSuccess={true} />
          <Button label="Відмінити" onClick={onClose} isDanger={true} />
        </section>
      </FormContainer>
    </Modal>
  );
};

export default ImageModal;
