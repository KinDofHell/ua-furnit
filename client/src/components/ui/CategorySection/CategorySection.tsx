import categorySectionStyles from "./CategorySection.module.scss";

import { HTMLAttributes, FC } from "react";
import { Link } from "react-router-dom";

interface CategorySectionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  link: string;
  background: string;
}

const CategorySection: FC<CategorySectionProps> = ({
  title,
  link,
  background,
}) => {
  return (
    <article
      className={categorySectionStyles.category__section}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <Link to={link}>
        <p className={categorySectionStyles.title}>{title}</p>
      </Link>
    </article>
  );
};

export default CategorySection;
