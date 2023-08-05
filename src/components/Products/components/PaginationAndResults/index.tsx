import React, { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setPaginationNumber } from "../../../../redux/actions";

import styles from "./PaginationAndResults.module.scss";

const PaginationAndResults = (): ReactElement => {
  const paginationFrom = useAppSelector((state) => state.data.pagination.from);
  const paginationNumber = useAppSelector(
    (state) => state.data.paginationNumber
  );
  const paginationSize = useAppSelector((state) => state.data.pagination.size);
  const paginationTotal = useAppSelector(
    (state) => state.data.pagination.total
  );
  const totalResults = useAppSelector((state) => state.data.pagination.total);

  const dispatch = useAppDispatch();

  const handleClick = (direction: "next" | "previous") => {
    if (direction === "previous") {
      dispatch(setPaginationNumber(paginationNumber - 1));
    } else {
      dispatch(setPaginationNumber(paginationNumber + 1));
    }
  };

  return (
    <div className={styles.component}>
      <div>
        <button
          aria-label="Go to previous page"
          className={styles.paginationButton}
          disabled={paginationNumber === 1}
          onClick={() => handleClick("previous")}
        >
          ←
        </button>
        <button
          aria-label="Go to next page"
          className={styles.paginationButton}
          disabled={paginationFrom + paginationSize === paginationTotal}
          onClick={() => handleClick("next")}
        >
          →
        </button>
      </div>
      <p className={styles.totalResults}>{totalResults} results</p>
    </div>
  );
};

export default PaginationAndResults;
