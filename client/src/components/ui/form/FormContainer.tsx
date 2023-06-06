import formStyles from "./FormContainer.module.scss";
import { FC, FormEventHandler, HTMLAttributes, ReactNode } from "react";

type ImageFormValues = {
  images: FileList | null;
};

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  method: "POST" | "GET";
  children: ReactNode;
  title: string;
  onSubmit: FormEventHandler;
}

const FormContainer: FC<FormProps> = ({
  method,
  children,
  title,
  onSubmit,
}) => {
  return (
    <form method={method} className={formStyles.form} onSubmit={onSubmit}>
      <h2>{title}</h2>
      <section className={formStyles.fields}>{children}</section>
    </form>
  );
};

export default FormContainer;
