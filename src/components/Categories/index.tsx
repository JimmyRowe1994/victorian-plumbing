import React, { ReactElement, useMemo } from "react";

import styles from "./Categories.module.scss";
import Category from "./components/Category";

const Categories = (): ReactElement => {
  const categoryLinks = useMemo(
    () =>
      [
        {
          category: "basins",
          image:
            "https://images.victorianplumbing.co.uk/products/basins/semi-pedestal-basin/listingimages/semi-pedestal-basins.webp?origin=semi-pedestal-basins.png&w=280",
          text: "Basins",
        },
        {
          category: "baths",
          image:
            "https://images.victorianplumbing.co.uk/products/baths/free-standing-baths/listingimages/freestandingbaths_.webp?origin=freestandingbaths_.jpg&w=280",
          text: "Baths",
        },
        {
          category: "showers",
          image:
            "https://images.victorianplumbing.co.uk/products/showers/electric-showers/aquas-electric-showers/listingimages/aquaselectricshowers_.webp?origin=aquaselectricshowers_.jpg&w=280",
          text: "Showers",
        },
        {
          category: "toilets",
          image:
            "https://images.victorianplumbing.co.uk/products/toilets/close-coupled-toilet/listingimages/closecoupledtoilet_.webp?origin=closecoupledtoilet_.jpg&w=280",
          text: "Toilets",
        },
      ].map((category) => <Category key={category.category} {...category} />),
    []
  );

  return <section className={styles.component}>{categoryLinks}</section>;
};

export default Categories;
