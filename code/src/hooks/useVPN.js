import vpnServices from "@services/vpn.services";
import { useAuthSelector, useDeviceSelector, useSettingsSelector, useUserSelector } from "./use-selector";
import { getTxDetails } from "@root/redux/helpers/getTxDetails";
import useLoader from "./use-loader";
import { useDispatch } from "react-redux";
import { dispatchFetchAccountBalance } from "@actions/auth.actions";
import { dispatchConnectToVPN, dispatchDisconnectFromVPN, dispatchFetchConnectionStatus, dispatchFetchIPAddress } from "@actions/vpn.actions";
import { useCallback } from "react";
import useAlerts, { ALERT_TYPES } from "./use-alerts";

const useVPN = () => {
  const dispatch = useDispatch();
  const showAlert = useAlerts();
  const { walletAddress } = useAuthSelector();
  const { subscription } = useUserSelector();
  const { feeGrantEnabled } = useSettingsSelector();
  const { startLoader, stopLoader, changeMessage } = useLoader();

  const fetchSessionDetails = async (walletAddress) => {
    try {
      const response = await vpnServices.fetchSessionDetails(walletAddress);
      return response;
    } catch (e) {
      throw { reason: "failed_fetch_session" };
    }
  };

  const createASession = useCallback(
    async (existingSession, node) => {
      try {
        const payload = {
          activeSession: existingSession && existingSession.id ? Number.parseInt(existingSession.id) : null,
          subscriptionID: Number.parseInt(subscription.id),
          node: node.address,
        };
        const response = await vpnServices.createSession({ walletAddress, data: payload, feeGrantEnabled });
        if (response.code) {
          if (["5", 5].includes(response.code)) {
            throw { reason: "failed_create_session_no_balance" };
          }
          if (!["0", 0].includes(response.code)) {
            throw {
              reason: "failed_create_session_for",
              data: { code: response.code },
            };
          }
        }
        const details = await getTxDetails(response.txhash);
        let code = details.code || 0;
        if (code) {
          if (["5", 5].includes(code)) {
            throw { reason: "failed_create_session_no_balance" };
          }
          if (!["0", 0].includes(code)) {
            throw {
              reason: "failed_create_session_for",
              data: { code },
            };
          }
        }
        const session = await fetchSessionDetails(walletAddress);
        if (session && session.id) {
          return session;
        }
        throw {
          reason: "failed_create_session",
        };
      } catch (error) {
        throw error;
      }
    },
    [subscription, walletAddress, feeGrantEnabled]
  );

  const connectVPN = async (node = {}) => {
    try {
      if (node) {
        startLoader({ message: "fetching_existing_session" });
        const existingSession = await fetchSessionDetails(walletAddress);
        changeMessage({ message: existingSession && existingSession.id ? "renewing_the_session" : "creating_a_session" });
        const newSession = await createASession(existingSession, node);
        const payload = {
          url: node.remoteURL,
          nodeProtocol: node.protocol,
          address: walletAddress,
          session: Number.parseInt(newSession.id),
        };
        changeMessage({ message: "creating_credentials" });
        const credentials = await vpnServices.createCredentials(payload, feeGrantEnabled);
        if (credentials) {
          return await dispatch(dispatchConnectToVPN({ credentials, node })).unwrap();
        }
      }
    } catch (error) {
      console.log(error);
      showAlert({ type: ALERT_TYPES.error, message: error.reason || "error_connecting_vpn", data: error.data || {} });
      return error;
    } finally {
      changeMessage({ message: "refreshing" });
      await dispatch(dispatchFetchConnectionStatus());
      await dispatch(dispatchFetchAccountBalance(walletAddress));
      await dispatch(dispatchFetchIPAddress());
      stopLoader();
    }
  };

  return { connectVPN };
};
export default useVPN;
