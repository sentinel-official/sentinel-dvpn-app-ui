import React from "react";
import { RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { ErrorAlert, SuccessAlert } from "./components/Alerts";
import Loader from "./components/Loader";
import router from "./router";
import Modal from "./containers/Modal";

const App = () => {
  const { error, success, loader, modal } = useSelector(
    (state) => state.alerts
  );

  return (
    <>
      <RouterProvider router={router} />
      {error.show && <ErrorAlert />}
      {success.show && <SuccessAlert />}
      {loader.show && <Loader />}
      {modal.show && <Modal type={modal.type} />}
    </>
  );
};

export default App;
