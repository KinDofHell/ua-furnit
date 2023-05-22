import mainStyles from "./Main.module.scss";

import { HTMLAttributes, ReactNode, FC } from "react";

interface MainProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
  return <main className={mainStyles.main}>{children}</main>;
};

export default Main;
