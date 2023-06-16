import imageModalStyles from "./ImageModal.module.scss";

import Modal from "react-modal";

import { FC, useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";

import Button from "../ui/buttons/Button";
import FormContainer from "../ui/form/FormContainer";
import { AuthContext } from "../../layouts/authContext/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserFormValues {
  login: string | null;
  password: string | null;
}

const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, login } = useContext(AuthContext);
  const { handleSubmit, control, reset } = useForm<UserFormValues>();

  const onSubmit = async (data: UserFormValues) => {
    await login(data.login, data.password);
    reset();
    onClose();
  };

  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Login Modal"
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
        title="Авторизація"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="login"
          control={control}
          defaultValue=""
          rules={{
            required: "Це поле обов'язкове!",
            minLength: {
              value: 4,
              message: "Мінімум 4 символів!",
            },
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <section>
              <input
                type="text"
                id="login"
                placeholder="Логін..."
                onChange={onChange}
                onBlur={onBlur}
                value={value! || ""}
              />
              {error && <p>{error.message}</p>}
            </section>
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: "Це поле обов'язкове!",
            minLength: {
              value: 4,
              message: "Мінімум 4 символів!",
            },
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <section>
              <input
                type="password"
                id="password"
                placeholder="Пароль"
                onChange={onChange}
                onBlur={onBlur}
                value={value! || ""}
              />
              {error && <p>{error.message}</p>}
            </section>
          )}
        />
        <section className={imageModalStyles.control_btns}>
          <Button label="Авторизуватися" type="submit" isSuccess={true} />
          <Button label="Відмінити" onClick={onClose} isDanger={true} />
        </section>
      </FormContainer>
    </Modal>
  );
};
export default LoginModal;
