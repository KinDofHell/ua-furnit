import buttonStyles from "./Buttons.module.scss";

import { FC, HTMLAttributes, MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: MouseEventHandler;
  link?: string;
  className?: string;
  isDanger?: boolean;
  isSuccess?: boolean;
  isBackground?: boolean;
  type?: "submit";
}

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  link,
  isDanger,
  isSuccess,
  isBackground,
  className,
  type,
  ...props
}) => {
  if (link)
    return (
      <Link to={link} style={{ width: "auto" }}>
        <button
          className={`${buttonStyles.button} ${className} ${
            isBackground && buttonStyles.button_background
          } ${
            isDanger ? buttonStyles.danger : isSuccess && buttonStyles.success
          }`}
          onClick={onClick}
          {...props}
        >
          {label}
        </button>
      </Link>
    );
  else
    return (
      <button
        className={`${buttonStyles.button} ${className} ${
          isBackground && buttonStyles.button_background
        } ${
          isDanger ? buttonStyles.danger : isSuccess && buttonStyles.success
        }`}
        onClick={onClick}
        type={type}
        {...props}
      >
        {label}
      </button>
    );
};

export default Button;
