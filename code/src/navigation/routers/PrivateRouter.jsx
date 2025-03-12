import BottomNavBar from "@containers/BottomNavBar";
import { useAuthSelector, useLoaderSelector, useSettingsSelector } from "@hooks/use-selector";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import styles from "./private-router.module.scss";
import useInitApp from "@hooks/use-init-app";
import useModal from "@hooks/use-modal";
import { dispatchGetFeeGrantDetails, dispatchRegisterWalletAddress } from "@actions/auth.actions";
import { useDispatch } from "react-redux";
import useLoader from "@hooks/use-loader";
import { CHANGE_LOADING_APP, SET_FEEGRANT_CHECKED, STOP_LOADER } from "@reducers/loader.reducer";
import { INTERNET_STATUS, RPC_ERROR } from "@services/events";
import { dispatchFetchCurrentRPC } from "@actions/user.actions";

const PrivateRouter = React.memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, walletAddress } = useAuthSelector();
  const { isFeegrantChecked, loadingApp } = useLoaderSelector();
  const { feeGrantEnabled } = useSettingsSelector();
  const { initApp } = useInitApp();
  const { showModal, MODAL_VARIANTS } = useModal();
  const { startLoader, stopLoader, changeMessage } = useLoader();

  const showBottomNavbar = React.useMemo(
    () => ["/user", "/user/countries", "/user/account", "/user/settings", "/user/recent-servers"].includes(location.pathname),
    [location.pathname]
  );

  const shouldUserPay = React.useCallback(async () => {
    startLoader({ message: "checking_wallet_details" });
    const { payload: isRegisted } = await dispatch(dispatchRegisterWalletAddress(walletAddress));
    if (isRegisted) {
      changeMessage({ message: "checking_feegrant" });
      const { payload: canUserContinue } = await dispatch(dispatchGetFeeGrantDetails({ walletAddress, feeGrantEnabled }));
      return { isRegistered: true, showFeegrantModal: !canUserContinue };
    }
    showModal({ name: "retry-register", cancellable: false });
    return { isRegistered: false };
  }, [feeGrantEnabled, walletAddress]);

  const init = React.useCallback(async () => {
    if (isFeegrantChecked && !loadingApp) {
      initApp();
      return;
    }
    if (loadingApp) {
      await dispatch(dispatchFetchCurrentRPC());
      const response = await shouldUserPay();
      await dispatch(CHANGE_LOADING_APP(false));
      stopLoader();

      if (!response.isRegistered) {
        return;
      }
      if (response.showFeegrantModal) {
        showModal({ name: "fee-grant", cancellable: false, variant: MODAL_VARIANTS.secondary });
        return;
      }
      await dispatch(SET_FEEGRANT_CHECKED(true));
    }
  }, [initApp, shouldUserPay, loadingApp, isFeegrantChecked, dispatch]);

  React.useEffect(() => {
    if (isAuthenticated) {
      init();
      return;
    }
  }, [init, isAuthenticated]);

  React.useEffect(() => {
    const handleRpcError = async () => {
      try {
        await dispatch(CHANGE_LOADING_APP(false)).unwrap();
        await dispatch(CHANGE_LOADING_APP(true)).unwrap();
      } catch (error) {
        
      } finally {
        await dispatch(dispatchFetchCurrentRPC());
      }
    }

    const handleUserInternetStatus = async ({detail}) => {
      if (detail.status === false) {
        await dispatch(CHANGE_LOADING_APP(false)).unwrap();
        await dispatch(CHANGE_LOADING_APP(true)).unwrap();
      }
    }

    window.addEventListener(RPC_ERROR, handleRpcError);
    window.addEventListener(INTERNET_STATUS, handleUserInternetStatus)
    return () => {
      window.removeEventListener(RPC_ERROR, handleRpcError);
      window.removeEventListener(INTERNET_STATUS, handleUserInternetStatus)
    }
   }, [])

  if (isAuthenticated) {
    return (
      <div className={styles.root}>
        <section className={`${styles.outlet} ${showBottomNavbar ? styles.with : styles.without}`}>
          <Outlet />
        </section>
        {showBottomNavbar && (
          <section className={styles.navbar}>
            <BottomNavBar />
          </section>
        )}
      </div>
    );
  }
  return (
    <Navigate
      to={"/"}
      replace={true}
    />
  );
});

export default PrivateRouter;
