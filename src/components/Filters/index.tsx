import React, { ReactElement, useEffect, useMemo, useState } from "react";

import Filter from "./components/Filter";
import styles from "./Filters.module.scss";
import { callAPI } from "../../helpers/callAPI";
import { setProducts } from "../../actions/productsActions";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { FilterData, FilterOption, SelectedFilters } from "./types";
import { setPaginationInfo } from "../../actions/filtersActions";

const Filters = (): ReactElement => {
  const [filterData, setFilterData] = useState<Array<FilterData>>([]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});

  const category = useAppSelector((state) => state.filters.category);
  const paginationNumber = useAppSelector(
    (state) => state.filters.paginationNumber
  );
  const sortBy = useAppSelector((state) => state.filters.sortBy);

  const dispatch = useAppDispatch();

  const filters = useMemo(() => {
    return filterData.map((filter: FilterData) => {
      const handleChange = (filterOption: Partial<FilterOption>) => {
        // If this type of filter is already being tracked
        if (Object.hasOwn(selectedFilters, filter.identifier)) {
          const updatedFilterOptions = [...selectedFilters[filter.identifier]];
          const index = updatedFilterOptions.findIndex(
            (selectedFilterOption: Partial<FilterOption>) =>
              selectedFilterOption.identifier === filterOption.identifier
          );

          // If this option is already being tracked within the filter, then remove it
          if (index >= 0) {
            updatedFilterOptions.splice(index, 1);

            // If removing it makes this type of filter empty, remove the filter entirely
            if (updatedFilterOptions.length === 0) {
              const updatedSelectedFilters = { ...selectedFilters };
              delete updatedSelectedFilters[filter.identifier];

              setSelectedFilters(updatedSelectedFilters);
            } else {
              setSelectedFilters((selectedFilters) => ({
                ...selectedFilters,
                [filter.identifier]: updatedFilterOptions,
              }));
            }
          } else {
            updatedFilterOptions.push(filterOption);
            setSelectedFilters((selectedFilters) => ({
              ...selectedFilters,
              [filter.identifier]: updatedFilterOptions,
            }));
          }
        } else {
          setSelectedFilters((selectedFilters) => ({
            ...selectedFilters,
            [filter.identifier]: [filterOption],
          }));
        }
      };

      return (
        <Filter
          onChange={handleChange}
          selectedFilters={selectedFilters}
          {...filter}
        />
      );
    });
  }, [filterData, selectedFilters]);

  useEffect(() => {
    const fetchFilters = async () => {
      const { facets, pagination, products } = await callAPI({
        path: "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI",
        method: "POST",
        payload: {
          additionalPages: 0,
          pageNumber: paginationNumber,
          query: category,
          size: 30,
          sort: sortBy,
          ...(Object.keys(selectedFilters).length > 0 && {
            facets: selectedFilters,
          }),
        },
      });

      setFilterData(facets);
      dispatch(setPaginationInfo(pagination));
      dispatch(setProducts(products));
    };

    fetchFilters();
  }, [category, dispatch, paginationNumber, selectedFilters, sortBy]);

  return <section className={styles.component}>{filters}</section>;
};

export default Filters;
