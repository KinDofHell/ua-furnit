import loadingStyles from "./Loading.module.scss";

const Loading = () => {
  return (
    <section className={loadingStyles.loading}>
      <p>Очікуйте...</p>
    </section>
  );
};

export default Loading;
