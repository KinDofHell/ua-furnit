import logoStyle from "./Headers.module.scss";

const Logo = () => {
  return (
    <div className={logoStyle.logo}>
      <div className={logoStyle.item_1}>UA</div>
      <div className={logoStyle.item_2}>Furnit</div>
    </div>
  );
};

export default Logo;
