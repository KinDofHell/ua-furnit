import homeStyles from "./Home.module.scss";
import CategorySection from "../components/ui/CategorySection/CategorySection";

import kitchen from "../assets/imgs/kitchen.png";
import bathroom from "../assets/imgs/bathroom.jpg";
import bedroom from "../assets/imgs/bedroom.webp";

const Home = () => {
  return (
    <main className={homeStyles.home}>
      <div className={`${homeStyles.arrow} ${homeStyles.arrow_left}`}>
        <span></span>
        <span></span>
      </div>
      <section className={homeStyles.categories}>
        <CategorySection
          title="Кухня"
          link="/furniture/kitchen"
          background={kitchen}
        />
        <CategorySection
          title="Ванна"
          link="/furniture/bathroom"
          background={bathroom}
        />
        <CategorySection
          title="Спальня"
          link="/furniture/bedroom"
          background={bedroom}
        />
      </section>
      <div className={`${homeStyles.arrow} ${homeStyles.arrow_right}`}>
        <span></span>
        <span></span>
      </div>
    </main>
  );
};

export default Home;
