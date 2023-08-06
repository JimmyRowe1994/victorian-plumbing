import React, { ReactElement } from "react";
import clsx from "clsx";

import styles from "./Category.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setCategory } from "../../../../redux/actions";

interface Props {
  category: string;
  image: string;
  text: string;
}

const Category = ({ category, image, text }: Props): ReactElement => {
  const isCurrentCategory = useAppSelector(
    (state) => state.data.category === category
  );

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setCategory(category));
  };

  return (
    <button
      aria-label={text}
      className={clsx(styles.component, {
        [styles.activeCategory]: isCurrentCategory,
      })}
      onClick={handleClick}
    >
      <img alt={text} className={styles.image} src={image} />
      <div className={styles.text}>{text}</div>
    </button>
  );
};

export default Category;
