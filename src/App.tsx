import React, { useEffect } from "react";

import Categories from "./components/Categories";
import Filters from "./components/Filters";
import Products from "./components/Products";
import styles from "./App.module.scss";
import { callAPI } from "./helpers/callAPI";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { setFacets, setPagination, setProducts } from "./redux/actions";
import { FilterOption } from "./types";

// TO DO MOVE INTO A FILE SO IT CAN BE CALLED IN MULITPLE PLACES
interface SelectedFilters {
  [key: string]: Array<FilterOption>;
}

const App = () => {
  const category = useAppSelector((state) => state.data.category);
  const selectedFilters = useAppSelector<SelectedFilters>(
    (state) => state.data.selectedFilters
  );
  const sortType = useAppSelector((state) => state.data.sortType);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const { facets, pagination, products } = await callAPI({
          method: "POST",
          path: "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI",
          payload: {
            additionalPages: 0,
            pageNumber: 0,
            query: category,
            size: 30,
            sort: sortType,
            facets: selectedFilters,
          },
          signal,
        });
        dispatch(setFacets(facets));
        dispatch(setPagination(pagination));
        dispatch(setProducts(products));
      } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [dispatch, selectedFilters, category, sortType]);

  return (
    <div className={styles.component}>
      <h1 className={styles.title}>Victorian Plumbing</h1>
      <div className={styles.contentWrapper}>
        <Filters />
      </div>
      {/* <Products />
      <Categories /> */}
    </div>
  );
};

export default App;
