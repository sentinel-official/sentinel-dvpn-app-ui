import React from "react";
import { Route, Routes } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import HomeScreen from "./screens/HomeScreen";
import LaunchingScreen from "./screens/LaunchingScreen";

import OnboardingLayout from "./layouts/OnboardingLayout";
import {
  OnboardingCreateScreen,
  OnboardingImportScreen,
  OnboardingStartScreen,
} from "./screens/Onboarding";
import Snakbar from "./components/Alerts/Snakbar";
import { useSelector } from "react-redux";

function App() {
  const { showSnakAlert } = useSelector((state) => state.alerts);

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
        </Route>
      </Routes>
      {showSnakAlert && <Snakbar />}
    </>
  );
}

export default React.memo(App);
