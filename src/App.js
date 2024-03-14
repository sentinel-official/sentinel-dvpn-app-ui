import React from "react";
import { useSelector } from "react-redux";
import { ErrorAlert, SuccessAlert } from "./components/Alerts";
import Loader from "./components/Loader";
import Navigation from "./Navigation";

const App = () => {
  const { error, success, loader } = useSelector((state) => state.alerts);

  return (
    <>
      <Navigation />
      {error.show && <ErrorAlert />}
      {success.show && <SuccessAlert />}
      {loader.show && <Loader />}
    </>
  );
};

export default App;
