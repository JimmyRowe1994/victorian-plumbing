import React, { ReactElement, useMemo } from "react";
import { setPaginationNumber, setSortBy } from "../../actions/filtersActions";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ProductCard from "./components/ProductCard";

import styles from "./Products.module.scss";
import { Product } from "./types";

const Products = (): ReactElement => {
  const productListings = useAppSelector<Array<Product>>(
    (state) => state.products.listings
  );

  const paginationInfo = useAppSelector(
    (state) => state.filters.paginationInfo
  );
  const paginationNumber = useAppSelector(
    (state) => state.filters.paginationNumber
  );
  const sortBy = useAppSelector((state) => state.filters.sortBy);

  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(Number(event.target.value)));
  };

  const handlePagination = (direction: "back" | "next") => {
    if (direction === "back" && paginationNumber > 0) {
      dispatch(setPaginationNumber(paginationNumber - 1));
    } else {
      dispatch(setPaginationNumber(paginationNumber + 1));
    }
  };

  const productListingCards = useMemo(
    () =>
      productListings.map((product: Product) => <ProductCard {...product} />),
    [productListings]
  );

  return (
    <section className={styles.component}>
      <div className={styles.sortByWrapper}>
        <select onChange={handleChange} value={sortBy}>
          <option value={1}>Recommended</option>
          <option value={2}>Price low to high</option>
          <option value={3}>Price high to low</option>
          <option value={4}>Largest discount</option>
        </select>
        <span>{paginationInfo.total} result(s)</span>
      </div>
      <div className={styles.productCards}>{productListingCards}</div>
      <div className={styles.paginationControls}>
        <button
          aria-label="Previous page"
          disabled={paginationNumber === 0}
          onClick={() => handlePagination("back")}
        >
          {"<"}
        </button>
        <button
          aria-label="Next page"
          disabled={paginationInfo.total <= paginationInfo.size}
          onClick={() => handlePagination("next")}
        >
          {">"}
        </button>
      </div>
    </section>
  );
};

export default Products;
