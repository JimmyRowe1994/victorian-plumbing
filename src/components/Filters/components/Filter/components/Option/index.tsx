import React, { ReactElement } from "react";

import styles from "./Option.module.scss";
import { FilterOption } from "../../../../../../types";

interface Props extends FilterOption {
  isChecked?: boolean;
  onChange: (filterOption: FilterOption) => void;
}

const Option = ({
  displayValue,
  identifier,
  isChecked,
  onChange,
  productCount,
  value,
}: Props): ReactElement => {
  const handleChange = () => {
    onChange({
      displayValue,
      identifier,
      productCount,
      value,
    });
  };

  return (
    <li className={styles.component}>
      <label className={styles.label}>
        <input
          className={styles.input}
          checked={isChecked}
          onChange={handleChange}
          type="checkbox"
        />
        {displayValue}
        {productCount && (
          <span className={styles.productCount}>({productCount})</span>
        )}
      </label>
    </li>
  );
};

export default Option;
