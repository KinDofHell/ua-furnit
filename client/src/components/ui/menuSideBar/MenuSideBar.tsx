import menuSideBareStyles from "./MenuSideBarStyles.module.scss";
import Button from "../buttons/Button";
import {
  FC,
  HTMLAttributes,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import LoginModal from "../../modal/LoginModal";
import { AuthContext } from "../../../layouts/authContext/AuthContext";

interface MenuSidebarProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClickBurgerHandler: MouseEventHandler;
}

const MenuSideBar: FC<MenuSidebarProps> = ({
  isOpen,
  onClickBurgerHandler,
}) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const onClickLogout = () => {
    logout();
  };

  return (
    <aside
      className={`${menuSideBareStyles.menu__sidebar} ${
        isOpen
          ? menuSideBareStyles.opened__sidebar
          : menuSideBareStyles.closed__sidebar
      }`}
    >
      <section className={menuSideBareStyles.navbar}>
        <Button
          label="Головна"
          className={menuSideBareStyles.button}
          onClick={onClickBurgerHandler}
          link="/"
        />
        <Button
          label="Контакти"
          className={menuSideBareStyles.button}
          onClick={onClickBurgerHandler}
          link="/contacts"
        />
        <Button
          label="Питання"
          className={menuSideBareStyles.button}
          onClick={onClickBurgerHandler}
          link="/questions"
        />
      </section>
      <section className={menuSideBareStyles.admin}>
        <span></span>
        {!isAuthenticated ? (
          <Button
            label="Увійти"
            className={menuSideBareStyles.button__login}
            onClick={() => setLoginModalOpen(true)}
          />
        ) : (
          <Button
            label="Вийти"
            className={menuSideBareStyles.button__login}
            onClick={onClickLogout}
          />
        )}
      </section>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </aside>
  );
};

export default MenuSideBar;
