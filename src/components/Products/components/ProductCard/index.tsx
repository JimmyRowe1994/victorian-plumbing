import clsx from "clsx";
import React, { ReactElement } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import { Product } from "../../../../types";
import AverageRating from "./AverageRating";

import styles from "./ProductCard.module.scss";

const ProductCard = ({
  attributes,
  averageRating,
  id,
  image,
  price,
  productName,
}: Product): ReactElement => {
  const view = useAppSelector((state) => state.data.productView);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    alert("I don't actually go anywhere. Sorry.");
  };

  return (
    <div
      className={clsx(styles.component, {
        [styles.listView]: view === "list",
      })}
    >
      <img
        alt={image.attributes.imageAltText}
        className={styles.image}
        src={image.url}
      />
      <div className={styles.textWrapper}>
        <div>
          <a className={styles.name} href="/" onClick={handleClick}>
            {productName}
          </a>
          <p className={styles.price}>£{price.priceIncTax}</p>
        </div>
        <div>
          {attributes.isBestSeller && (
            <p className={styles.bestSeller}>Best Seller</p>
          )}
          {averageRating ? (
            <AverageRating averageRating={averageRating} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
