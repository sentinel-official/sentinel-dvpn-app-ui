import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles/app-layout.module.scss";
import HomeIcon from "../assets/icons/tab-home-icon.svg";
import NodesIcon from "../assets/icons/tab-nodes-icon.svg";
import AccountIcon from "../assets/icons/tab-account-icon.svg";
import SettingsIcon from "../assets/icons/tab-settings-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import APIService from "../services/app.services";
import { SET_MAP_LOCATION } from "../redux/map.reducer";
import {
  SET_ACCOUNT_BALANCE,
  SET_IP_ADDRESS,
  SET_USD_PRICE,
} from "../redux/account.reducer";
import { SET_SHOW_ERROR_ALERT } from "../redux/alerts.reducer";
import { fetchCountriesAction } from "../actions/nodes.actions";

const tabs = [
  {
    title: "Nodes",
    logo: NodesIcon,
    path: "/app/countries",
  },
  {
    title: "Account",
    logo: AccountIcon,
    path: "/app/account",
  },
  {
    title: "Settings",
    logo: SettingsIcon,
    path: "/app/settings",
  },
];

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { walletAddress, deviceToken } = useSelector((state) => state.user);

  const navigateTo = (event, path) => {
    event.preventDefault();
    navigate(path);
  };

  const fetchBalance = React.useCallback(() => {
    APIService.getCurrentPrice()
      .then((price) => {
        dispatch(SET_USD_PRICE(Number.parseFloat(price)));
        return APIService.getBalance(walletAddress);
      })
      .then(({ balances }) => {
        balances.forEach(async (balance) => {
          if (balance.denom === "udvpn") {
            const newBalance = Number.parseInt(balance.amount) / 1e6;
            dispatch(SET_ACCOUNT_BALANCE(newBalance));
          }
        });
      })
      .catch(() => {
        dispatch(
          SET_SHOW_ERROR_ALERT({
            showErrorAlert: true,
            message: "Error while fetching balance",
          })
        );
      });
  }, [walletAddress, dispatch]);

  const updateMapLocation = React.useCallback(() => {
    APIService.getIpAddress(deviceToken)
      .then(({ data }) => {
        dispatch(
          SET_MAP_LOCATION({
            latitude: data.latitude,
            longitude: data.longitude,
          })
        );
        dispatch(SET_IP_ADDRESS(data.ip));
      })
      .catch(() => {
        dispatch(
          SET_SHOW_ERROR_ALERT({
            showErrorAlert: true,
            message: "Error while fetching IP Address",
          })
        );
      });
  }, [deviceToken, dispatch]);

  const fetchCountries = React.useCallback(() => {
    dispatch(fetchCountriesAction());
  }, [dispatch]);

  React.useLayoutEffect(() => {
    fetchBalance();
    updateMapLocation();
    fetchCountries();
  }, [fetchBalance, updateMapLocation, fetchCountries]);

  if (walletAddress && deviceToken) {
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <Outlet />
        </div>
        <div className={styles["tab-bar"]}>
          <button
            onClick={(event) => navigateTo(event, "/app")}
            className={`${styles.tab} ${
              location.pathname === "/app" ? styles.selected : ""
            }`}
            disabled={location.pathname === "/app"}
          >
            <img src={HomeIcon} alt="" />
            <span>{"Home"}</span>
          </button>

          {tabs.map((tab) => {
            const isSelected = location.pathname.startsWith(tab.path);
            return (
              <button
                key={tab.title}
                onClick={(event) => navigateTo(event, tab.path)}
                className={`${styles.tab} ${isSelected ? styles.selected : ""}`}
                disabled={isSelected}
              >
                <img src={tab.logo} alt="" />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return <Navigate to={"/onboarding"} />;
};

export default AppLayout;
