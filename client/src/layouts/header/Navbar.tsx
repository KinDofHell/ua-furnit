import navbarStyles from "./Headers.module.scss";

import Button from "../../components/ui/buttons/Button";

const Navbar = () => {
  return (
    <nav className={navbarStyles.navbar}>
      <Button label="Головна" link="/" className={navbarStyles.button_navbar} />
      <Button
        label="Контакти"
        link="/contacts"
        className={navbarStyles.button_navbar}
      />
      <Button
        label="Питання"
        link="/questions"
        className={navbarStyles.button_navbar}
      />
    </nav>
  );
};

export default Navbar;
