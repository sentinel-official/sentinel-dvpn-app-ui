import { ADD_MODAL_DATA } from "@reducers/alerts.reducer";
import React from "react";
import { useDispatch } from "react-redux";

const { useNavigate, useSearchParams } = require("react-router-dom");

const useModal = () => {
  const MODAL_VARIANTS = {
    primary: "primary",
    secondary: "secondary",
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const show = searchParams.get("show-modal");
  const name = searchParams.get("modal-name");
  const cancellable = searchParams.get("cancellable");
  const variant = searchParams.get("variant");

  const showModal = ({ name = "", cancellable = true, data = {}, variant = "primary" }) => {
    if (show) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("show-modal", true);
      newParams.set("modal-name", name);
      newParams.set("cancellable", cancellable);
      newParams.set("variant", variant);
      navigate(`?${newParams.toString()}`, { replace: true });
    } else {
      setSearchParams({ "show-modal": true, "modal-name": name, cancellable, variant });
    }
    dispatch(ADD_MODAL_DATA(data));
  };

  const hideModal = () => {
    navigate(-1, { replace: true });
  };

  const getModalDetails = React.useCallback(() => {
    return { show, name, cancellable, variant };
  }, [show, name, variant]);

  return { showModal, hideModal, getModalDetails, MODAL_VARIANTS };
};

export default useModal;
