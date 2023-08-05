import clsx from "clsx";
import React, { ChangeEvent, ReactElement, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setSortType } from "../../redux/actions";
import { Product } from "../../types";
import PaginationAndResults from "./components/PaginationAndResults";
import ProductCard from "./components/ProductCard";
import SortAndView from "./components/SortAndView";

import styles from "./Products.module.scss";

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
