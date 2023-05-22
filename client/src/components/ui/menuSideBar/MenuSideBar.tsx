import menuSideBareStyles from "./MenuSideBarStyles.module.scss";
import Button from "../buttons/Button";
import {
  FC,
  HTMLAttributes,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

interface MenuSidebarProps extends HTMLAttributes<HTMLDivElement> {
  isAuth: boolean;
  isOpen: boolean;
  onClickBurgerHandler: MouseEventHandler;
}

const MenuSideBar: FC<MenuSidebarProps> = ({
  isAuth,
  isOpen,
  onClickBurgerHandler,
}) => {
  return (
    <aside
      className={`${menuSideBareStyles.menu__sidebar} ${
        isOpen
          ? menuSideBareStyles.opened__sidebar
          : menuSideBareStyles.closed__sidebar
      }`}
    >
      <div className={menuSideBareStyles.navbar}>
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
      </div>
      <div className={menuSideBareStyles.admin}>
        <span></span>
        {isAuth && (
          <Button label="Увійти" className={menuSideBareStyles.button__login} />
        )}
      </div>
    </aside>
  );
};

export default MenuSideBar;
