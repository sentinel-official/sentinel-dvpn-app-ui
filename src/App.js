import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  OnboardingCreateScreen,
  OnboardingImportScreen,
  OnboardingStartScreen,
} from "./screens/Onboarding";

import AppLayout from "./layouts/AppLayout";
import OnboardingLayout from "./layouts/OnboardingLayout";

import { Error, Success } from "./components/Alerts";
import LaunchingScreen from "./screens/LaunchingScreen";
import HomeScreen from "./screens/HomeScreen";
import { Cities, Continents, Countries, Nodes } from "./screens/NodesScreen";
import AccountScreen from "./screens/AccountScreen";
import SettingsScreen from "./screens/SettingsScreen";

function App() {
  const { showSuccessAlert, showErrorAlert } = useSelector(
    (state) => state.alerts
  );

  return (
    <>
      <Routes>
        <Route index element={<LaunchingScreen />} />

        <Route path="/onboarding" element={<OnboardingLayout />}>
          <Route index element={<OnboardingStartScreen />} />
          <Route path="create" element={<OnboardingCreateScreen />} />
          <Route path="import" element={<OnboardingImportScreen />} />
        </Route>

        <Route path="/app" element={<AppLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="continents" element={<Continents />} />
          <Route
            path="continents/:continent/countries"
            element={<Countries />}
          />
          <Route
            path="continents/:continent/countries/:country/cities"
            element={<Cities />}
          />
          <Route
            path="continents/:continent/countries/:country/cities/:city/nodes"
            element={<Nodes />}
          />
          <Route path="account" element={<AccountScreen />} />
          <Route path="settings" element={<SettingsScreen />} />
        </Route>
      </Routes>
      {showSuccessAlert && <Success />}
      {showErrorAlert && <Error />}
    </>
  );
}

export default React.memo(App);
