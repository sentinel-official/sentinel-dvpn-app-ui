import { dispatchDisconnectFromVPN, dispatchFetchConnectionStatus, dispatchFetchIPAddress } from "@actions/vpn.actions";
import { useDispatch } from "react-redux";
import useGetRandomNode from "./use-getRandomNode";
import { useCallback } from "react";
import { useUserSelector } from "./use-selector";
import useModal from "./use-modal";
import useLoader from "./use-loader";
import useVPN from "./useVPN";

const useQuickConnect = () => {
  const { getRandomServer, getRandomCity, getRandomCountry } = useGetRandomNode();
  const { subscription } = useUserSelector();
  const { showModal } = useModal();
  const { connectVPN } = useVPN();

  const quickConnect = useCallback(
    async ({ country = {}, city = {}, server = {} } = {}) => {
      try {
        if (!(subscription && subscription.id)) {
          showModal({ name: "subscription" });
          return;
        }
        if (server && server.name) {
          await connectVPN(server);
          return;
        }
        if (city && city.name) {
          const s = await getRandomServer(city);
          await connectVPN(s);
          return;
        }
        if (country && country.name) {
          const ct = await getRandomCity(country);
          const s = await getRandomServer(ct);
          await connectVPN(s);
          return;
        }
        const c = await getRandomCountry();
        const ct = await getRandomCity(c);
        const s = await getRandomServer(ct);
        await connectVPN(s);
        return;
      } catch (e) {
        console.log("e", e);
      }
    },
    [subscription.id]
  );
  return quickConnect;
};

export const useDisconnectVPN = () => {
  const dispatch = useDispatch();
  const { startLoader, stopLoader } = useLoader();
  const disconnectVPN = async () => {
    try {
      startLoader({ message: "disconnecting" });
      await dispatch(dispatchDisconnectFromVPN());
    } catch (e) {
      alert(JSON.stringify(e));
      console.log("e", e);
    } finally {
      await dispatch(dispatchFetchConnectionStatus());
      await dispatch(dispatchFetchIPAddress());
      stopLoader();
    }
  };
  return disconnectVPN;
};

export default useQuickConnect;
