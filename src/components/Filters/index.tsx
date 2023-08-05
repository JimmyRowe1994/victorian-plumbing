import React, { useMemo } from "react";

import Filter from "./components/Filter";
import styles from "./Filters.module.scss";
import { Facet } from "../../types";
import { useAppSelector } from "../../hooks/redux";
import AppliedFilters from "./components/AppliedFilters";

const Filters = () => {
  const facets = useAppSelector<Array<Facet>>((state) => state.data.facets);

  const filters = useMemo(
    () => facets?.map((facet) => <Filter key={facet.identifier} {...facet} />),
    [facets]
  );

  return (
    <section className={styles.component}>
      <h2 className={styles.title}>Filter by</h2>
      <AppliedFilters />
      {filters}
    </section>
  );
};

export default Filters;
