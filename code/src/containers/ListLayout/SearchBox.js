import React from "react";
import styles from "./styles.module.scss";

import useTranslation from "@hooks/use-translation";
import MagnifierIcon from "@svgs/magnifier-icon.svg";
import { Image } from "@components/index";
import useSearchText from "@hooks/use-search-text";

const SearchBox = () => {
  const { translate } = useTranslation();
  const { onSearchTextChange, searchText } = useSearchText();

  return (
    <section className={styles.box}>
      <Image
        src={MagnifierIcon}
        className={`${styles["mag-icon"]} ml-6 mr-2`}
      />

      <input
        className={`${styles.input} fs-16 fw-5 px-8 mt-2 text-ffffff`}
        type={"text"}
        onChange={(event) => onSearchTextChange(event.target.value)}
        value={searchText}
        placeholder={translate("search")}
        disabled={false}
      />
    </section>
  );
};

export default SearchBox;
