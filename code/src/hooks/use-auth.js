import { CHANGE_AUTH_STATUS } from "@reducers/auth.reducer";
import { useDispatch } from "react-redux";
import useLoader from "./use-loader";
import authServices from "@services/auth.services";
import vpnServices from "@services/vpn.services";
import { ADD_NEW_ALERT } from "@reducers/alerts.reducer";
import useAlerts, { ALERT_TYPES } from "./use-alerts";
import { useAuthSelector, useRefferrerSelector, useUserSelector } from "./use-selector";
import { GAS_PRICE_AMOUNT } from "@root/constants";

const useAuth = () => {
  const dispatch = useDispatch();
  const { startLoader, changeMessage, stopLoader } = useLoader();
  const { referredBy } = useRefferrerSelector();
  const login = async (mnemonic = "") => {
    try {
      startLoader({ message: "login_authenticating" });
      await authServices.login({ mnemonic });
      changeMessage({ message: "login_fetching_wallet" });
      const response = await authServices.fetchWalletAddress();
      await authServices.registerWalletAddress(response.address, referredBy);

      if (response.address) {
        dispatch(
          CHANGE_AUTH_STATUS({
            isAuthenticated: true,
            mnemonic,
            walletAddress: response.address,
            isEncrypted: true,
          })
        );
      }
    } catch (e) {
      dispatch(
        ADD_NEW_ALERT({
          type: ALERT_TYPES.error,
          message: `error_login`,
          data: { error: e.message },
        })
      );
      console.error(e);
    } finally {
      stopLoader();
    }
  };
  const logout = async () => {
    try {
      await vpnServices.postDisconnect();
    } catch (e) {
      dispatch(
        ADD_NEW_ALERT({
          type: ALERT_TYPES.error,
          message: `error_disconnecting_vpn`,
          data: { error: e.message },
        })
      );
    } finally {
      const lanaguage = window.localStorage.getItem("language") || "en";
      await window.localStorage.clear();
      window.localStorage.setItem("language", lanaguage);
      await dispatch(
        CHANGE_AUTH_STATUS({
          isAuthenticated: false,
          walletAddress: "",
          mnemonic: "",
          isEncrypted: false,
        })
      );
    }
  };
  return { login, logout };
};

export const useDeleteAccount = () => {
  const showAlert = useAlerts();
  const { walletAddress } = useAuthSelector();
  const { balance } = useUserSelector();
  const { startLoader, stopLoader } = useLoader();
  const { logout } = useAuth();
  const deleteAccount = async () => {
    try {
      startLoader({ message: "deleting_account" });
      if (balance <= GAS_PRICE_AMOUNT) {
        logout();
        return;
      }
      const response = await authServices.sendBackTokens({ walletAddress, balance: balance - GAS_PRICE_AMOUNT });
      if (response.code && response.code !== 0) {
        showAlert({ type: ALERT_TYPES.error, message: "error_while_deleting_account", data: { code: response.code } });
        return;
      }
      logout();
      return;
    } catch (e) {
      console.log(e);
      showAlert({ type: ALERT_TYPES.error, message: "error_deleting_account" });
    } finally {
      stopLoader();
      return;
    }
  };
  return deleteAccount;
};

export default useAuth;
