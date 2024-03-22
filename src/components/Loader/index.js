import React from "react";
import styles from "./loader.module.scss";
import LoadingIndicator from "./LoadingIndicator";
import { useSelector } from "react-redux";

const Loader = () => {
  const { message } = useSelector((state) => state.alerts.loader);

  React.useEffect(() => {
    const handleClick = (event) => {
      event.stopPropagation();
    };

    const loader = document.getElementById("loader");
    if (loader) {
      loader.addEventListener("click", handleClick);
    }

    return () => {
      if (loader) {
        loader.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <div className={styles.root} id="loader">
      <LoadingIndicator />
      <span>{message}</span>
    </div>
  );
};

export default Loader;
