import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import styles from "./styles/onboarding-layout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import APIService from "../services/app.services";
import { SET_IS_ONBOARDING, SET_USER_DETAILS } from "../redux/user.reducer";
import { SET_SHOW_ERROR_ALERT } from "../redux/alerts.reducer";

const OnboardingLayout = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { mnemonic } = useSelector((state) => state.user);
  const { walletAddress, deviceToken } = useSelector((state) => state.user);

  React.useEffect(() => {
    const createWallet = () => {
      const payload = {
        mnemonic,
      };

      APIService.setWallet(payload)
        .then(() => {
          return Promise.all([
            APIService.getKey("deviceToken"),
            APIService.getWallet(),
          ]);
        })
        .then(([deviceToken, walletAddress]) => {
          dispatch(
            SET_USER_DETAILS({
              value: deviceToken.value,
              address: walletAddress.address,
            })
          );
        })
        .catch(() => {
          dispatch(
            SET_SHOW_ERROR_ALERT({
              showErrorAlert: true,
              message: "Error while initializing",
            })
          );
        })
        .finally(() => {
          dispatch(SET_IS_ONBOARDING(false));
        });
    };
    if (mnemonic && mnemonic.length > 0) {
      dispatch(SET_IS_ONBOARDING(true));
      createWallet();
    }
  }, [dispatch, mnemonic, navigate]);

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
