import React from "react";
import types from "./modal-types";
import styles from "./modal.module.scss";
import { useDispatch } from "react-redux";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";
import { useLocation } from "react-router-dom";

const Modal = ({ show, type, ...rest }) => {
  const Component = types[type];
  const dispatch = useDispatch();
  const location = useLocation();
  const [pathName, setPathName] = React.useState("");

  React.useEffect(() => {
    if (location.pathname !== pathName) {
      dispatch(CHANGE_MODAL_STATE({ show: false, type: null }));
    }
  }, [location.pathname, dispatch, pathName]);

  React.useEffect(() => {
    if (show) {
      setPathName(location.pathname);
    }
  }, [show, location.pathname]);

  if (show) {
    return (
      <div className={styles.root}>
        <div
          className={styles["modal-backdrop"]}
          onClick={() =>
            dispatch(CHANGE_MODAL_STATE({ show: false, type: null }))
          }
        ></div>

        <div className={styles.container}>
          <Component {...rest} />
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
