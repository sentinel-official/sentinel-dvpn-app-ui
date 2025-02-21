import { Button, Text } from "@components/index";
import { CHANGE_LOADING_APP } from "@reducers/loader.reducer";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "./retry-register.module.scss";
import useModal from "@hooks/use-modal";

const RetryRegister = () => {
  const dispatch = useDispatch();
  const { hideModal } = useModal();
  return (
    <div className={`${styles.root} p-16`}>
      <Text text={"retry"} className="fs-20 fw-5 mb-16" />
      <Text text={"error_registering_wallet"} className="fs-14 fw-4 text-9cabc9  mb-24" />
      <Button
        onClick={() => {
          hideModal();
          dispatch(CHANGE_LOADING_APP(true));
        }}
      >
        <Text text={"retry"} className={"py-8 fs-14"} />
      </Button>
    </div>
  );
};

export default RetryRegister;
