import notFoundStyles from "./NotFound.module.scss";
import Button from "../components/ui/buttons/Button";

const NotFound = () => {
  return (
    <article className={notFoundStyles.notFound}>
      <section className={notFoundStyles.error}>
        <h2>
          404 <span>Error</span>
        </h2>
        <section>
          <p>Сторінки не існує!</p>
          <Button
            label="Повернутися на головну"
            className={notFoundStyles.btn}
            link="/"
          />
        </section>
      </section>
    </article>
  );
};

export default NotFound;
