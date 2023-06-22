import imageModalStyles from "./ImageModal.module.scss";

import Modal from "react-modal";

import {FC, useContext, useState} from "react";
import {useForm, Controller} from "react-hook-form";

import Button from "../ui/buttons/Button";
import FormContainer from "../ui/form/FormContainer";
import {AuthContext} from "../../layouts/authContext/AuthContext";
import axiosInstance from "../../utils/axiosInstance";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface UserFormValues {
    login: string | null;
    password: string | null;
    repeatPassword: string | null;
}

const LoginModal: FC<LoginModalProps> = ({isOpen, onClose}) => {
    const {login} = useContext(AuthContext);
    const {handleSubmit, control, reset, getValues} = useForm<UserFormValues>();
    const [isRegister, setIsRegister] = useState<boolean>(false);

    const onSubmit = async (data: UserFormValues) => {
        await login(data.login, data.password);
        reset();
        onClose();
    };

    const onSubmitRegister = async (data: UserFormValues) => {
        if (isRegister)
            if (data.password !== data.repeatPassword) {
                alert("Паролі не співпадають");
                return;
            }
        await axiosInstance.post("/register", {login: data.login, password: data.password})
        reset();
        handleOnChangeForm();
    }

    const handleOnChangeForm = () => {
        setIsRegister(!isRegister);
    }

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
                title={!isRegister ? "Авторизація" : "Реєстрація"}
                method="POST"
                onSubmit={handleSubmit(!isRegister ? onSubmit : onSubmitRegister)}
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
                                 field: {onChange, onBlur, value},
                                 fieldState: {error},
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
                                 field: {onChange, onBlur, value},
                                 fieldState: {error},
                             }) => (
                        <section>
                            <input
                                type="password"
                                id="password"
                                placeholder="Пароль..."
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value! || ""}
                            />
                            {error && <p>{error.message}</p>}
                        </section>
                    )}
                />
                {isRegister && <Controller
                    name="repeatPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "Це поле обов'язкове!",
                        minLength: {
                            value: 4,
                            message: "Мінімум 4 символів!",
                        },
                        validate: {
                            matchesPassword: (value) => {
                                const {password} = getValues();
                                return value === password || "Паролі не збігаються!";
                            },
                        },
                    }}
                    render={({
                                 field: {onChange, onBlur, value},
                                 fieldState: {error},
                             }) => (
                        <section>
                            <input
                                type="password"
                                id="repeatPassword"
                                placeholder="Повторіть пароль..."
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value! || ""}
                            />
                            {error && <p>{error.message}</p>}
                        </section>
                    )}
                />}
                <section className={imageModalStyles.control_btns}>
                    <Button label={!isRegister ? "Авторизуватися" : "Зареєструватися"} type="submit" isSuccess={true}/>
                    <Button label="Відмінити" onClick={onClose} isDanger={true}/>
                </section>
                <Button label={!isRegister ? "Зареєструватися" : "Увійти"} className={imageModalStyles.register_btn}
                        onClick={handleOnChangeForm}/>
            </FormContainer>
        </Modal>
    );
};
export default LoginModal;
