import React from "react";

import Categories from "./components/Categories";
import Filters from "./components/Filters";
import Products from "./components/Products";
import styles from "./App.module.scss";

const App = () => {
  return (
    <div className={styles.component}>
      <Filters />
      <Products />
      <Categories />
    </div>
  );
};

export default App;
