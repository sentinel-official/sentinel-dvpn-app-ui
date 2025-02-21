import { RadioButton } from "@components/index";
import { useSettingsSelector } from "@hooks/use-selector";
import { CHANGE_LIST_TITLE, CHANGE_LOADING_APP } from "@reducers/loader.reducer";
import { CHANGE_FEE_GRANT } from "@reducers/settings.reducer";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const FeeGranter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { feeGrantEnabled } = useSettingsSelector();

  React.useEffect(() => {
    dispatch(
      CHANGE_LIST_TITLE({
        title: "set_fee_granter",
        canGoBack: true,
      })
    );
  }, []);

  return (
    <>
      <RadioButton
        value={"default_granter_address"}
        onChange={async () => {
          await dispatch(CHANGE_FEE_GRANT(true));
          await dispatch(CHANGE_LOADING_APP(true));
          navigate(-2, { replace: true });
        }}
        isChecked={feeGrantEnabled}
      />
      <RadioButton
        value={"no_granter"}
        onChange={() => {
          dispatch(CHANGE_FEE_GRANT(false));
          navigate(-2, { replace: true });
        }}
        isChecked={!feeGrantEnabled}
      />
    </>
  );
};

export default FeeGranter;
