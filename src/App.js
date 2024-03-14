import React from "react";
import { RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { ErrorAlert, SuccessAlert } from "./components/Alerts";
import Loader from "./components/Loader";
import router from "./router";

const App = () => {
  const { error, success, loader } = useSelector((state) => state.alerts);

  return (
    <>
      <RouterProvider router={router} />
      {error.show && <ErrorAlert />}
      {success.show && <SuccessAlert />}
      {loader.show && <Loader />}
    </>
  );
};

export default App;
