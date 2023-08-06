import React from "react";

import styles from "./AverageRating.module.scss";

interface Props {
  averageRating: number;
}

const AverageRating = ({ averageRating }: Props) => {
  const stars = Array(5)
    .fill(null)
    .map((_, index) =>
      Math.round(index + 1) <= averageRating ? (
        <span key={index} className={styles.filledStar}>
          ★
        </span>
      ) : (
        <span key={index}>☆</span>
      )
    );

  return (
    <div className={styles.component}>
      {stars}
      <span className={styles.text}>({averageRating})</span>
    </div>
  );
};

export default AverageRating;
