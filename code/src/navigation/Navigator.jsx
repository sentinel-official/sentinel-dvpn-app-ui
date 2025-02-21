import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import PublicRouter from "./routers/PublicRouter";
import OnboardingHome from "@public/OnboardingHome";
import Startup from "@public/Startup";
import ImportWallet from "@public/ImportWallet";
import Page404 from "@root/screens/Page404";
import PrivateRouter from "./routers/PrivateRouter";
import CreateWallet from "@public/CreateWallet";
import Home from "@private/Home";
import CountriesList from "@private/Nodes/CountriesList";
import CitiesList from "@private/Nodes/CitiesList";
import ServersList from "@private/Nodes/ServersList";
import Account from "@private/Account";
import Settings from "@private/Settings";
import RecentServers from "@private/RecentServers";
import ListLayout from "@layouts/ListLayout";
import PageLayout from "@layouts/PageLayout";
import WalletDetails from "@private/Account/WalletDetails";
import Subscriptions from "@private/Account/Subscriptions";
import PrivateKey from "@private/Account/PrivateKey";
import Languages from "@private/Settings/Languages";
import RPCDetails from "@private/Settings/RPCDetails";
import DNSDetails from "@private/Settings/DNSDetails";
import FeeGranter from "@private/Settings/FeeGranter";
import AddCustomDNS from "@private/Settings/AddCustomDNS";
import useModal from "@hooks/use-modal";
import AddBalance from "@private/Account/AddBalance";
import SplitTunnelling from "@private/Settings/SplitTunnelling";

const Navigator = () => {
  const { getModalDetails, hideModal } = useModal();
  const { show } = getModalDetails();
  React.useEffect(() => {
    if (show) {
      hideModal();
    }
  }, []);

  return (
    <Routes>
      <Route element={<PublicRouter />} path="/">
        <Route index element={<OnboardingHome />} />
        <Route path="/start" element={<Startup />} />
        <Route path="/import" element={<ImportWallet />} />
        <Route path="/create" element={<CreateWallet />} />
      </Route>

      <Route element={<PrivateRouter />} path="/user">
        <Route index element={<Home />} />

        <Route path="countries" element={<ListLayout />}>
          <Route index element={<CountriesList />} />
          <Route path=":countryId/cities" element={<CitiesList />} />
          <Route path=":countryId/cities/:cityId/servers" element={<ServersList />} />
        </Route>
        <Route path="" element={<ListLayout />}>
          <Route path="recent-servers" element={<RecentServers />} />
        </Route>

        <Route element={<PageLayout />} path="">
          <Route path="account" element={<Account />} />
          <Route path="wallet-details" element={<WalletDetails />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="private-key" element={<PrivateKey />} />
          <Route path="add-balance" element={<AddBalance />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/languages" element={<Languages />} />
          <Route path="settings/rpc-details" element={<RPCDetails />} />
          <Route path="settings/dns-details" element={<DNSDetails />} />
          <Route path="settings/dns-details/new" element={<AddCustomDNS />} />
          <Route path="settings/fee-granter" element={<FeeGranter />} />
          <Route path="settings/split-tunnelling" element={<SplitTunnelling />} />
        </Route>
      </Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default Navigator;
