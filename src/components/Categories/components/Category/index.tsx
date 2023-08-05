import React, { ReactElement } from "react";
import clsx from "clsx";

import styles from "./Category.module.scss";
// import { setCategory } from "../../../../actions/filtersActions";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

interface Props {
  category: string;
  image: string;
  text: string;
}

const Category = ({ category, image, text }: Props): ReactElement => {
  // const isCurrentCategory = useAppSelector(
  //   (state) => state.filters.category === category
  // );

  // const dispatch = useAppDispatch();

  // const handleClick = () => {
  //   // dispatch(setCategory(category));
  // };

  return (
    // <button
    //   aria-label={text}
    //   className={clsx(styles.component, {
    //     [styles.activeCategory]: isCurrentCategory,
    //   })}
    //   onClick={handleClick}
    // >
    //   <img alt={text} className={styles.image} src={image} />
    //   <div className={styles.text}>{text}</div>
    // </button>
    <div>Hello</div>
  );
};

export default Category;
