import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error, Success } from "./components/Alerts";
import Loader from "./components/Loader";
import APIService from "./services/app.services";
import { SET_IS_VPN_CONNECTED } from "./redux/device.reducer";
import { SET_SHOW_ERROR_ALERT } from "./redux/alerts.reducer";
import Navigation from "./Navigation";

function App() {
  const dispatch = useDispatch();
  const { showSuccessAlert, showErrorAlert, isLoading } = useSelector(
    (state) => state.alerts
  );

  const getStatus = React.useCallback(async () => {
    const response = await APIService.getStatus();
    if (response) {
      dispatch(SET_IS_VPN_CONNECTED(response.isConnected));
    } else {
      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Failed to fetch VPN Connection Status",
        })
      );
    }
  }, [dispatch]);

  React.useEffect(() => {
    getStatus();
  }, [getStatus]);

  return (
    <>
      <Navigation />
      {isLoading && <Loader />}
      {showSuccessAlert && <Success />}
      {showErrorAlert && <Error />}
    </>
  );
}

export default React.memo(App);
