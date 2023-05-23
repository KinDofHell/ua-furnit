import headerStyle from "./Headers.module.scss";

import { useState } from "react";

import Logo from "./Logo";
import Navbar from "./Navbar";
import User from "./User";
import MenuSideBar from "../../components/ui/menuSideBar/MenuSideBar";

const Header = () => {
  const [isAuth, setIsAuth] = useState<boolean>(true);

  const [isBurgerOpened, setIsBurgerOpened] = useState<boolean>(false);

  const onClickBurgerHandler = () => {
    setIsBurgerOpened(!isBurgerOpened);
  };

  return (
    <header className={headerStyle.header}>
      <Logo />
      <Navbar />
      <User isAuth={isAuth} />
      <div
        className={`${headerStyle.burger} ${
          isBurgerOpened && headerStyle.burger__opened
        }`}
        onClick={onClickBurgerHandler}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <MenuSideBar
        isAuth={isAuth}
        isOpen={isBurgerOpened}
        onClickBurgerHandler={onClickBurgerHandler}
      />
    </header>
  );
};

export default Header;
