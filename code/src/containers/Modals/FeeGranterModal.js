import React from "react";
import styles from "./fee-granter.module.scss";

import { useDispatch } from "react-redux";
import { Button, Text } from "@components/index";
import useModal from "@hooks/use-modal";
import { CHANGE_LOADING_APP, SET_FEEGRANT_CHECKED } from "@reducers/loader.reducer";
import { CHANGE_FEE_GRANT } from "@reducers/settings.reducer";
const FeeGranterModal = () => {
  const dispatch = useDispatch();
  const { hideModal } = useModal();
  return (
    <div className={`${styles.root} p-16 py-24`}>
      <Text text={"fee_grant"} className="fs-18 fw-5 mb-16" />
      <Text text={"fee_grant_desc"} className="fs-14 fw-4 text-9cabc9 mb-16" />
      <Text text={"what_is_fee_grant"} className="text-link mb-32" />
      <Button
        onClick={() => {
          hideModal();
          dispatch(CHANGE_LOADING_APP(true));
          dispatch(SET_FEEGRANT_CHECKED(true));
          dispatch(CHANGE_FEE_GRANT(false));
        }}
      >
        <Text text={"proceed"} className="py-8 fs-14" />
      </Button>
    </div>
  );
};

export default FeeGranterModal;
