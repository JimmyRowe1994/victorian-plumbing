import React, { ReactElement, useCallback, useMemo } from "react";

import styles from "./AppliedFilters.module.scss";
import { SelectedFilters } from "../../../../types";
import { setSelectedFilters } from "../../../../redux/actions";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

const AppliedFilters = (): ReactElement | null => {
  const selectedFilters = useAppSelector<SelectedFilters>(
    (state) => state.data.selectedFilters
  );

  const dispatch = useAppDispatch();

  const appliedFilters = useMemo(
    () =>
      Object.keys(selectedFilters).map((key) =>
        selectedFilters[key].map((selectedFilter, index) => {
          const handleClick = () => {
            const updatedSelectedFilters = [...selectedFilters[key]];
            updatedSelectedFilters.splice(index, 1);

            dispatch(
              setSelectedFilters({
                ...selectedFilters,
                [key]: updatedSelectedFilters,
              })
            );
          };

          return (
            <li
              key={`${key}-${selectedFilter.identifier}`}
              className={styles.listItem}
            >
              <button
                aria-label={`Delete ${selectedFilter.displayValue} filter`}
                className={styles.deleteButton}
                onClick={handleClick}
              >
                X
              </button>
              {selectedFilter.displayValue}
            </li>
          );
        })
      ),
    [dispatch, selectedFilters]
  );

  if (Object.keys(selectedFilters).length === 0) {
    return null;
  }

  return (
    <div className={styles.component}>
      <h3 className={styles.title}>Applied filters</h3>
      <ul className={styles.appliedFilters}>{appliedFilters}</ul>
    </div>
  );
};

export default AppliedFilters;
