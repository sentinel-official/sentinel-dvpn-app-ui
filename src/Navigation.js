import React from "react";
import {
  Account,
  CitiesList,
  CountriesList,
  Home,
  PrivateKey,
  ServersList,
  Settings,
} from "./Screens/App";
import { Create, Import, Start } from "./Screens/Onboarding";
import { Route, Routes } from "react-router-dom";

import { AppLayout, ListLayout, OnboardingLayout } from "./layouts";
import { useSelector } from "react-redux";

const Navigation = () => {
  const { isWalletCreated, isRegistered } = useSelector(
    (state) => state.device
  );
  if (isRegistered && isWalletCreated) {
    return (
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="countries" element={<ListLayout />}>
            <Route index element={<CountriesList />} />
            <Route path=":countryId/cities" element={<CitiesList />} />
            <Route
              path=":countryId/cities/:cityId/servers"
              element={<ServersList />}
            />
          </Route>
          <Route path="account" element={<Account />} />
          <Route path="settings" element={<Settings />} />
          <Route path="private-key" element={<PrivateKey />} />
        </Route>
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<OnboardingLayout />}>
        <Route index element={<Start />} />
        <Route path="create" element={<Create />} />
        <Route path="import" element={<Import />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
