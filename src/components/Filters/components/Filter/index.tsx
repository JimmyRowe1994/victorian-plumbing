import React, { ReactElement, useMemo } from "react";
import { FilterData, FilterOption, SelectedFilters } from "../../types";

import styles from "./Filter.module.scss";

interface Props extends FilterData {
  onChange: (filterOption: FilterOption) => void;
  selectedFilters: SelectedFilters;
}

const Filter = ({
  displayName,
  identifier,
  onChange,
  options,
  selectedFilters,
}: Props): ReactElement => {
  const filterOptions = useMemo(
    () =>
      options.map((option: FilterOption) => {
        const isChecked = !!selectedFilters[identifier]?.find(
          (filter: Partial<FilterOption>) =>
            filter.identifier === option.identifier
        );

        return (
          <li className={styles.filterOption}>
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onChange(option)}
              />
              {option.displayValue}
            </label>
          </li>
        );
      }),
    [identifier, onChange, options, selectedFilters]
  );

  return (
    <div>
      <h3>{displayName}</h3>
      <ul>{filterOptions}</ul>
    </div>
  );
};

export default Filter;
