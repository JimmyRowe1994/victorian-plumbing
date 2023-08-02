import React, { ReactElement } from "react";
import { Product } from "../../types";

import styles from "./ProductCard.module.scss";

// Would likely be made into a link that uses the slug data if this was real rather than just a div
const ProductCard = ({
  id,
  image,
  price,
  productName,
}: Product): ReactElement => {
  return (
    <div className={styles.component}>
      <img
        alt={image.attributes.imageAltText}
        className={styles.image}
        src={image.url}
      />
      <div className={styles.textWrapper}>
        <p className={styles.name}>{productName}</p>
        <p className={styles.price}>£{price.priceIncTax}</p>
      </div>
    </div>
  );
};

export default ProductCard;
