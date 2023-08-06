import React, { useEffect, useState } from "react";

import Categories from "./components/Categories";
import Filters from "./components/Filters";
import Products from "./components/Products";
import styles from "./App.module.scss";
import { callAPI } from "./helpers/callAPI";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { setFacets, setPagination, setProducts } from "./redux/actions";
import { FilterOption, SelectedFilters } from "./types";
import Modal from "./components/Modal";

const App = () => {
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);

  const category = useAppSelector((state) => state.data.category);
  const paginationNumber = useAppSelector(
    (state) => state.data.paginationNumber
  );
  const selectedFilters = useAppSelector<SelectedFilters>(
    (state) => state.data.selectedFilters
  );
  const sortType = useAppSelector((state) => state.data.sortType);

  const dispatch = useAppDispatch();

  const isSmallScreen = window.innerWidth < 900;

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
            pageNumber: paginationNumber,
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
  }, [dispatch, paginationNumber, selectedFilters, category, sortType]);

  return (
    <div className={styles.component}>
      <h1 className={styles.title}>Victorian Plumbing</h1>
      <div className={styles.contentWrapper}>
        <Categories />
        {isSmallScreen ? (
          <button
            className={styles.openFiltersButton}
            onClick={() => setFilterModalIsOpen(true)}
          >
            Open filters
          </button>
        ) : (
          <Filters />
        )}
        <Products />
      </div>
      {isSmallScreen && (
        <Modal
          dialogTitle="Filters"
          dialogDescription="Select options to filter products"
          isOpen={filterModalIsOpen}
          onClose={() => setFilterModalIsOpen(false)}
        >
          <Filters />
        </Modal>
      )}
    </div>
  );
};

export default App;
