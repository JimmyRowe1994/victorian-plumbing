import React, { ReactElement, useMemo } from "react";
import clsx from "clsx";

import PaginationAndResults from "./components/PaginationAndResults";
import ProductCard from "./components/ProductCard";
import SortAndView from "./components/SortAndView";
import styles from "./Products.module.scss";
import { Product } from "../../types";
import { useAppSelector } from "../../hooks/redux";

const Products = (): ReactElement => {
  const products = useAppSelector<Array<Product>>(
    (state) => state.data.products
  );
  const view = useAppSelector((state) => state.data.productView);

  const productCards = useMemo(
    () =>
      products.map((product) => <ProductCard key={product.id} {...product} />),
    [products]
  );

  if (!products) {
    return (
      <p aria-live="polite" className={styles.noProductsMessage}>
        There are no products that match your selected filters.
      </p>
    );
  }

  return (
    <section className={styles.component}>
      <div className={styles.topper}>
        <SortAndView />
        <PaginationAndResults />
      </div>
      <div
        className={clsx(styles.productCardsWrapper, {
          [styles.gridView]: view === "grid",
          [styles.listView]: view === "list",
        })}
      >
        {productCards}
      </div>
    </section>
  );
};

export default Products;
