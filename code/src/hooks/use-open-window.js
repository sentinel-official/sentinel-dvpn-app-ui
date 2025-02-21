import proxyServices from "@services/proxy.services";
import useAlerts, { ALERT_TYPES } from "./use-alerts";

const useOpenWindow = () => {
  const showAlert = useAlerts();
  const openWindow = async ({ url }) => {
    try {
      await proxyServices.postWindowLink({ url });
    } catch (e) {
      showAlert({
        type: ALERT_TYPES.error,
        message: "error_while_open_window",
      });
    }
  };
  return { openWindow };
};

export default useOpenWindow;
