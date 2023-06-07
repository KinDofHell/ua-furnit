import imageModalStyles from "./ImageModal.module.scss";

import { FC } from "react";
import Modal from "react-modal";
import { useForm, Controller } from "react-hook-form";
import FormContainer from "../ui/form/FormContainer";
import Button from "../ui/buttons/Button";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageAdd: (files: File[]) => void;
}

interface ImageFormValues {
  images: FileList | null;
  coverImage: FileList | null;
}

const ImageModal: FC<ImageModalProps> = ({ isOpen, onClose, onImageAdd }) => {
  const { handleSubmit, control, reset } = useForm<ImageFormValues>();

  const onSubmit = (data: ImageFormValues) => {
    const { images, coverImage } = data;
    const selectedImages: File[] = [];

    if (images) {
      selectedImages.push(...Array.from(images));
    }
    if (coverImage) {
      selectedImages.push(...Array.from(coverImage));
    }
    onImageAdd(selectedImages);
    reset();
    onClose();
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
          height: "200px",
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
        <label htmlFor="coverImage">Обкладинка</label>
        <Controller
          name="coverImage"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <input
              id="coverImage"
              type="file"
              accept="image/*"
              onChange={(e) => field.onChange(e.target.files)}
              onBlur={field.onBlur}
            />
          )}
        />
        <label htmlFor="images">Інші фото</label>
        <Controller
          name="images"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => field.onChange(e.target.files)}
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
