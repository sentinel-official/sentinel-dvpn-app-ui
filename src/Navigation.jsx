import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  OnboardingCreateScreen,
  OnboardingImportScreen,
  OnboardingStartScreen,
} from "./screens/Onboarding";
import OnboardingLayout from "./layouts/OnboardingLayout";
import AppLayout from "./layouts/AppLayout";
import HomeScreen from "./screens/HomeScreen";
import { Cities, Countries, Nodes } from "./screens/NodesScreen";
import AccountScreen from "./screens/AccountScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LaunchingScreen from "./screens/LaunchingScreen";
import ListLayout from "./layouts/ListLayout";
import LaunchingLayout from "./layouts/LaunchingLayout";

const Navigation = () => {
  return (
    <Routes>
      <Route exact path="/" element={<LaunchingLayout />} />
      <Route index element={<LaunchingScreen />} />

      <Route path="/onboarding" element={<OnboardingLayout />}>
        <Route index element={<OnboardingStartScreen />} />
        <Route path="create" element={<OnboardingCreateScreen />} />
        <Route path="import" element={<OnboardingImportScreen />} />
      </Route>

      <Route path="/app" element={<AppLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="countries" element={<ListLayout />}>
          <Route index element={<Countries />} />
          <Route path=":countryId/cities" element={<Cities />} />
          <Route path=":countryId/cities/:cityId/nodes" element={<Nodes />} />
        </Route>
        <Route path="account" element={<AccountScreen />} />
        <Route path="settings" element={<SettingsScreen />} />
      </Route>
    </Routes>
  );
};

export default Navigation;