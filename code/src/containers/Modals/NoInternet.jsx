import { Button, Text } from "@components/index";
import React from "react";
import styles from "./retry-register.module.scss";
import { useDispatch } from "react-redux";
import useModal from "@hooks/use-modal";
import { CHANGE_LOADING_APP } from "@reducers/loader.reducer";


const NoInternet = () => {
  const dispatch = useDispatch();
  const { hideModal } = useModal();
  return (
    <div className={`${styles.root} p-16`}>
      <Text text={"no_internet"} className="fs-20 fw-5 mb-16" />
      <Text
        text={"error_no_internet"}
        className="fs-14 fw-4 text-9cabc9  mb-24"
      />
        <Button
        onClick={() => {
          hideModal();
          dispatch(CHANGE_LOADING_APP(true));
        }}
      >
        <Text text={"reload"} className={"py-8 fs-14"} />
      </Button>
    </div>
  );
};

export default NoInternet;
