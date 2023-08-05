import React, { useMemo, useState } from "react";

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

// import React, { useMemo, useState } from "react";

// import Filter from "./components/Filter";
// import styles from "./Filters.module.scss";
// import { Facet } from "../../types";
// import { useAppSelector } from "../../hooks/redux";
// import AppliedFilters from "./components/AppliedFilters";
// import clsx from "clsx";

// const isSmallScreen = window.innerWidth <= 900;

// const Filters = () => {
//   const [isOpen, setIsOpen] = useState(!isSmallScreen);

//   const facets = useAppSelector<Array<Facet>>((state) => state.data.facets);

//   const filters = useMemo(
//     () => facets?.map((facet) => <Filter key={facet.identifier} {...facet} />),
//     [facets]
//   );

//   return (
//     <section className={styles.component}>
//       <button
//         className={styles.button}
//         disabled={!isSmallScreen}
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <h2 className={styles.title}>
//           Filter by
//           {isSmallScreen && (
//             <span aria-hidden className={styles.icon}>
//               {isOpen ? "-" : "+"}
//             </span>
//           )}
//         </h2>
//       </button>
//       <div
//         className={clsx(styles.filtersWrapper, {
//           [styles.closedFiltersWrapper]: !isOpen,
//         })}
//       >
//         <AppliedFilters />
//         {filters}
//       </div>
//     </section>
//   );
// };

// export default Filters;
