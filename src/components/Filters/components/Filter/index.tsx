import React, { useCallback, useMemo, useState } from "react";

import styles from "./Filter.module.scss";
import { Facet, FilterOption } from "../../../../types";
import Option from "./components/Option";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setSelectedFilters } from "../../../../redux/actions";
import { SelectedFilters } from "../../../../types";
import clsx from "clsx";

const Filter = ({ displayName, identifier, options }: Facet) => {
  const [isOpen, setIsOpen] = useState(true);
  const selectedFilters = useAppSelector<SelectedFilters>(
    (state) => state.data.selectedFilters
  );

  const dispatch = useAppDispatch();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const filterOptions = useMemo(
    () =>
      options.map((option) => {
        const index = selectedFilters[identifier]?.findIndex(
          (selectedFilter) => selectedFilter.identifier === option.identifier
        );

        const handleChange = (filterOption: FilterOption) => {
          const selectedFilterOptions = [
            ...(selectedFilters[identifier] ?? []),
          ];

          if (index >= 0) {
            selectedFilterOptions.splice(index, 1);
          } else {
            selectedFilterOptions.push(filterOption);
          }

          dispatch(
            setSelectedFilters({
              ...selectedFilters,
              [identifier]: selectedFilterOptions,
            })
          );
        };

        return (
          <Option
            key={option.identifier}
            isChecked={index >= 0}
            onChange={handleChange}
            {...option}
          />
        );
      }),
    [dispatch, identifier, options, selectedFilters]
  );

  return (
    <div className={styles.component}>
      <button className={styles.title} onClick={handleClick}>
        <h3 className={styles.heading}>{displayName}</h3>
      </button>
      <ul
        className={clsx(styles.options, {
          [styles.optionsClosed]: !isOpen,
        })}
      >
        {filterOptions}
      </ul>
    </div>
  );
};

export default Filter;
