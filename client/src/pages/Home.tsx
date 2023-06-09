import homeStyles from "./Home.module.scss";
import CategorySection from "../components/ui/CategorySection/CategorySection";

import kitchen from "../assets/imgs/kitchen.png";
import bathroom from "../assets/imgs/bathroom.jpg";
import bedroom from "../assets/imgs/bedroom.webp";
import React, { useEffect, useRef, useState } from "react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [hideRight, setHideRight] = useState<boolean>(false);
  const [hideLeft, setHideLeft] = useState<boolean>(true);

  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0].clientX;
  };

  const handleSlideChange = (direction: string) => {
    if (direction === "prev") {
      setCurrentSlide(0);
    } else if (direction === "next") {
      setCurrentSlide(3);
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchStartX = touchStartXRef.current || 0;
    const deltaX = touchEndX - touchStartX;
    const swipeThreshold = 50;

    if (deltaX > swipeThreshold) {
      handleSlideChange("prev");
    } else if (deltaX < -swipeThreshold) {
      handleSlideChange("next");
    }

    touchStartXRef.current = null;
  };

  const slideData = [
    {
      title: "Кухні",
      link: "/furniture/kitchens",
      background: kitchen,
    },
    {
      title: "Шафи",
      link: "/furniture/wardrobes",
      background: bathroom,
    },
    {
      title: "Тумбочки",
      link: "/furniture/nightstands",
      background: bedroom,
    },
    {
      title: "Полиці",
      link: "/furniture/shelves",
      background: kitchen,
    },
    {
      title: "Столи",
      link: "/furniture/tables",
      background: bathroom,
    },
    {
      title: "Комоди",
      link: "/furniture/commodes",
      background: bedroom,
    },
  ];

  useEffect(() => {
    setHideLeft(currentSlide === 0);
    setHideRight(currentSlide === 3);
  }, [currentSlide]);

  return (
    <main className={homeStyles.home}>
      <div
        id="left"
        className={`${homeStyles.arrow} ${homeStyles.arrow_left}`}
        onClick={() => handleSlideChange("prev")}
      >
        <span className={hideLeft ? homeStyles.hide : ""}></span>
        <span className={hideLeft ? homeStyles.hide : ""}></span>
      </div>
      <section
        className={homeStyles.categories}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slideData.slice(currentSlide, currentSlide + 3).map((slide, index) => (
          <CategorySection
            key={index}
            title={slide.title}
            link={slide.link}
            background={slide.background}
          />
        ))}
      </section>
      <div
        id="right"
        className={`${homeStyles.arrow} ${homeStyles.arrow_right}`}
        onClick={() => handleSlideChange("next")}
      >
        <span className={hideRight ? homeStyles.hide : ""}></span>
        <span className={hideRight ? homeStyles.hide : ""}></span>
      </div>
    </main>
  );
};

export default Home;
