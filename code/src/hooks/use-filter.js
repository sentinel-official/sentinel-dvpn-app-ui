import { CHANGE_PROTOCOL_TYPE } from "@reducers/device.reducer";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { dispatchFetchCountriesList } from "@actions/proxy.actions";
import useLoader from "./use-loader";

const useProtocols = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { startLoader, stopLoader } = useLoader();

  const filterCountries = React.useCallback(async () => {
    if (pathname === "/user/countries") {
      try {
        startLoader({ message: "fetching_countries" });
        await dispatch(dispatchFetchCountriesList());
      } catch (e) {
      } finally {
        stopLoader();
      }
    }
  }, [pathname]);

  const changeProtocol = useCallback(
    async (value) => {
      await dispatch(CHANGE_PROTOCOL_TYPE(value));
      navigate(-1, { replace: true });
      await filterCountries();
    },
    [dispatch, navigate]
  );

  return { changeProtocol };
};

export default useProtocols;
