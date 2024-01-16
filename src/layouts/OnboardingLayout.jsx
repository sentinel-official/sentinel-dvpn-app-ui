import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import styles from "./styles/onboarding-layout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeviceDetails } from "../actions/device.actions";
import { withLoader } from "../actions/loader.actions";

const OnboardingLayout = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { mnemonic, walletAddress, deviceToken } = useSelector(
    (state) => state.device
  );

  React.useEffect(() => {
    if (mnemonic && mnemonic.length > 0) {
      dispatch(
        withLoader({
          dispatchers: [fetchDeviceDetails()],
          message: "Initialising...",
        })
      );
      return;
    }
  }, [deviceToken, dispatch, mnemonic, navigate, walletAddress]);

  if (walletAddress && deviceToken) {
    return <Navigate to="/app" />;
  }

  return (
    <div className={styles.root}>
      <Outlet />
    </div>
  );
};

export default OnboardingLayout;
