import { Button, Image } from "@components/index";
import React from "react";
import QuickConnectIcon from "@svgs/quick-connect-icon.svg";
import useQuickConnect from "@hooks/use-quick-connect";
import { useNavigate, useParams } from "react-router-dom";
import { useNodesSelector, useUserSelector, useVPNSelector } from "@hooks/use-selector";
import styles from "./styles.module.scss";
import useModal from "@hooks/use-modal";

const QuickConnect = () => {
  const quickConnect = useQuickConnect();
  const { isConnected, isConnecting } = useVPNSelector();
  const params = useParams();
  const navigate = useNavigate();
  const { current: cities } = useNodesSelector().cities;
  const { current: countries } = useNodesSelector().countries;
  const { current: servers } = useNodesSelector().servers;
  const { subscription } = useUserSelector();
  const { showModal } = useModal();



  const disabled = React.useMemo(() => {
    if (params.cityId) {
      return servers && servers.length === 0;
    }
    if (params.countryId) {
      return cities && cities.length === 0;
    }
    return countries && countries.length === 0;
  }, [params.cityId, params.countryId, cities, countries, servers]);

  const connect = React.useCallback(async () => {
    if (!(subscription && subscription.id)) {
      showModal({ name: "subscription" });
      return;
    }
    if (params.cityId) {
      const city = cities.filter((c) => Number.parseInt(c.id) === Number.parseInt(params.cityId));
      if (city && city.length > 0) {
        await quickConnect({ city: city[0] });
        navigate(-3, { replace: true });
      }
      return;
    }

    if (params.countryId) {
      const country = countries.filter((c) => Number.parseInt(c.id) === Number.parseInt(params.countryId));
      if (country && country.length > 0) {
        await quickConnect({ country: country[0] });
        navigate(-2, { replace: true });
      }
      return;
    }
    await quickConnect();
    navigate(-1, { replace: true });
  }, [params.cityId, params.countryId, cities, countries]);

  return (
    <Button className={styles["quick-connect-btn"]} onClick={connect} disabled={disabled || isConnected || isConnecting}>
      <Image src={QuickConnectIcon} />
    </Button>
  );
};

export default QuickConnect;
