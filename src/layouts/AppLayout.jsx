import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles/app-layout.module.scss";
import HomeIcon from "../assets/icons/tab-home-icon.svg";
import NodesIcon from "../assets/icons/tab-nodes-icon.svg";
import AccountIcon from "../assets/icons/tab-account-icon.svg";
import SettingsIcon from "../assets/icons/tab-settings-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import RenewSubscriptionModal from "../containers/HomeScreen/RenewSubscriptionModal";
import {
  dispatchFetchCurrentPrice,
  dispatchGetBalance,
  dispatchGetIpAddress,
  dispatchGetPlans,
  fetchMySubscriptions,
} from "../actions/user.actions";
import { withLoader } from "../actions/loader.actions";
import { fetchCountriesAction } from "../actions/nodes.actions";
import { SET_USER_DETAILS_FETCHED } from "../redux/alerts.reducer";

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
  const { walletAddress, deviceToken } = useSelector((state) => state.device);
  const { showRenewSubscription, isUserDetailsFetched } = useSelector(
    (state) => state.alerts
  );

  const navigateTo = (event, path) => {
    event.preventDefault();
    navigate(path);
  };

  React.useLayoutEffect(() => {
    if (walletAddress && deviceToken && !isUserDetailsFetched) {
      dispatch(
        withLoader({
          dispatchers: [
            dispatchGetPlans(),
            fetchCountriesAction(),
            dispatchFetchCurrentPrice(),
            dispatchGetBalance(walletAddress),
            dispatchGetIpAddress(deviceToken),
            fetchMySubscriptions(walletAddress),
            SET_USER_DETAILS_FETCHED(true),
          ],
        })
      );
    }
  }, [dispatch, walletAddress, deviceToken, isUserDetailsFetched]);

  if (walletAddress && deviceToken) {
    return (
      <div className={styles.root}>
        {showRenewSubscription && <RenewSubscriptionModal />}

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
