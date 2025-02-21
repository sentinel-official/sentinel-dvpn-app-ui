const { ADD_NEW_ALERT } = require("@reducers/alerts.reducer");
const { useDispatch } = require("react-redux");

export const ALERT_TYPES = {
  success: "success",
  error: "error",
};

const useAlerts = () => {
  const dispatch = useDispatch();
  const showAlert = ({ type = ALERT_TYPES.error, message = "Error", data = {} }) => {
    dispatch(ADD_NEW_ALERT({ type, message, data }));
  };

  return showAlert;
};

export default useAlerts;
