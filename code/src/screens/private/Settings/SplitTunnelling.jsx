import React from "react";
import styles from "./split-tunnelling.module.scss";
import { CHANGE_LIST_TITLE } from "@reducers/loader.reducer";
import { useDispatch } from "react-redux";
import ToggleEnable from "@containers/Settings/SplitTunnelling/ToggleEnable";
import ListOfApps from "@containers/Settings/SplitTunnelling/ListOfApps";

const SplitTunnelling = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      CHANGE_LIST_TITLE({
        title: "",
        canGoBack: true,
      })
    );
  }, []);

  return (
    <div className={styles.root}>
      <section className={styles.toggler}>
        <ToggleEnable />
      </section>
      <ListOfApps />
    </div>
  );
};

export default SplitTunnelling;
