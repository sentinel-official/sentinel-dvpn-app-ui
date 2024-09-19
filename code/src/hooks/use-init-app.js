import { useDispatch, useSelector } from "react-redux";
import useLoader from "./use-loader";
import { dispatchFetchConnectionStatus, dispatchFetchIPAddress } from "@actions/vpn.actions";
import { dispatchFetchAvailableDNS } from "@actions/settings.actions";
import { useCallback } from "react";
import { dispatchFetchCountriesList } from "@actions/proxy.actions";
import { dispatchFetchAccountBalance, dispatchFetchTokenPrice, dispatchRegisterWalletAddress } from "@actions/auth.actions";
import { useAuthSelector, useLoaderSelector } from "./use-selector";
import useAlerts, { ALERT_TYPES } from "./use-alerts";
import { SET_HOME_LOADED } from "@reducers/loader.reducer";
import {
  dispatchFetchApplicationVersion,
  dispatchFetchAvailablePlans,
  dispatchFetchAvailableSubscriptions,
  dispatchFetchCurrentDNS,
  dispatchFetchCurrentRPC,
} from "@actions/user.actions";
import useModal from "./use-modal";
import { dispatchPaymentLogin } from "@actions/payments.actions";

const useInitApp = () => {
  const dispatch = useDispatch();
  const showAlert = useAlerts();
  const { startLoader, stopLoader } = useLoader();
  const { walletAddress } = useAuthSelector();
  const { isHomeLoaded } = useLoaderSelector();
  const { showModal, MODAL_VARIANTS } = useModal();

  const initApp = useCallback(async () => {
    if (isHomeLoaded) {
      return;
    }
    try {
      const { payload } = await dispatch(dispatchFetchApplicationVersion());

      if (payload && payload.isLatestAvailable) {
        showModal({ name: "update-app", cancellable: false, variant: MODAL_VARIANTS.secondary });
        return;
      }
      startLoader({
        message: "preparing_the_app",
        description: "may_take_upto_30_secs",
      });
      await Promise.all([
        dispatch(dispatchFetchConnectionStatus()),
        dispatch(dispatchPaymentLogin(walletAddress)),
        dispatch(dispatchFetchIPAddress()),
        dispatch(dispatchFetchAccountBalance(walletAddress)),
        dispatch(dispatchFetchTokenPrice()),
        dispatch(dispatchFetchCurrentRPC()),
        dispatch(dispatchFetchCurrentDNS()),
        dispatch(dispatchFetchAvailableDNS()),
        dispatch(dispatchFetchAvailablePlans()),
        dispatch(dispatchFetchAvailableSubscriptions(walletAddress)),
        dispatch(dispatchFetchCountriesList()),
      ]);
    } catch (err) {
      showAlert({
        type: ALERT_TYPES.error,
        message: err.message || JSON.stringify(err),
      });
    } finally {
      stopLoader();
      dispatch(SET_HOME_LOADED(true));
      return true;
    }
  }, [dispatch, isHomeLoaded]);
  return { initApp };
};

export default useInitApp;
