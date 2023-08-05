import clsx from "clsx";
import React, { ChangeEvent, ReactElement, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setProductView, setSortType } from "../../../../redux/actions";

import styles from "./SortAndView.module.scss";

const SortAndView = (): ReactElement => {
  const sortType = useAppSelector((state) => state.data.sortType);
  const view = useAppSelector((state) => state.data.productView);

  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortType(Number(event.target.value)));
  };

  const handleClick = (viewType: "grid" | "list") => {
    dispatch(setProductView(viewType));
  };

  return (
    <div className={styles.component}>
      <label className={styles.sortTypeWrapper}>
        Sort by
        <select
          className={styles.sortType}
          onChange={handleChange}
          value={sortType}
        >
          <option value={1}>Recommended</option>
          <option value={2}>Price low to high</option>
          <option value={3}>Price high to low</option>
          <option value={4}>Largest discount</option>
        </select>
      </label>
      <div className={styles.view}>
        <button
          aria-label="Grid layout"
          className={clsx(styles.viewButton, {
            [styles.activeViewButton]: view === "grid",
          })}
          onClick={() => handleClick("grid")}
        >
          Grid
        </button>
        <button
          aria-label="List layout"
          className={clsx(styles.viewButton, {
            [styles.activeViewButton]: view === "list",
          })}
          onClick={() => handleClick("list")}
        >
          List
        </button>
      </div>
    </div>
  );
};

export default SortAndView;
