import { CHANGE_LIST_TITLE } from "@reducers/loader.reducer";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "./add-custom-dns.module.scss";
import {
  BTN_VARIANTS,
  Button,
  InputBox,
  RadioButton,
  Text,
} from "@components/index";
import { isValidIP } from "@helpers/isValidIP";
import { useSettingsSelector } from "@hooks/use-selector";
import { ADD_CUSTOM_DNS } from "@reducers/settings.reducer";
import { useNavigate } from "react-router-dom";
import useAlerts, { ALERT_TYPES } from "@hooks/use-alerts";

const AddCustomDNS = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showAlert = useAlerts();
  const { dnsList, customDNSList } = useSettingsSelector();

  const list = [...dnsList, ...customDNSList];

  const [state, setState] = React.useState({
    name: "",
    preferred: "",
    alternate: "",
    protocol: "ipv4",
  });

  const handleOnChange = (key, value) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  React.useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      preferred: "",
      alternate: "",
    }));
  }, [state.protocol]);

  React.useEffect(() => {
    dispatch(
      CHANGE_LIST_TITLE({
        title: "add_custom_dns",
        canGoBack: true,
      })
    );
  }, []);

  const handleSubmit = async () => {
    const isValidPreferred = isValidIP(state.preferred, state.protocol);
    if (!isValidPreferred) {
      showAlert({ type: ALERT_TYPES.error, message: "invalid_preferred_ip" });
      return;
    }

    const isValidAlternate = isValidIP(state.alternate, state.protocol);
    if (!isValidAlternate) {
      showAlert({ type: ALERT_TYPES.error, message: "invalid_alternate_ip" });
      return;
    }

    const addresses = `${state.preferred}, ${state.alternate}`;
    const isAvailable = list.find(
      (l) => l.preferredName === state.name || l.addresses === addresses
    );
    if (isAvailable && isAvailable.name) {
      showAlert({ type: ALERT_TYPES.error, message: "dns_already_available" });
      return;
    }
    await dispatch(
      ADD_CUSTOM_DNS({
        name: "custom",
        addresses,
        preferredName: state.name,
        isCustom: true,
      })
    );
    navigate(-1);
  };

  const handleClear = () => {
    setState({
      name: "",
      preferred: "",
      alternate: "",
      protocol: "ipv4",
    });
  };

  return (
    <div className={styles.root}>
      <section className={styles.top}>
        <InputBox
          title={"name_of_dns"}
          isPlaceHolder={false}
          value={state.name}
          onChange={(event) => {
            handleOnChange("name", event.target.value);
          }}
        />

        <section className={styles.radio}>
          <Text text={"internet_protocol"} className="text-dadada fs-12 fw-5" />
          <section className={styles["radio-btns"]}>
            <RadioButton
              value={"ipv4"}
              isChecked={state.protocol === "ipv4"}
              textClassName="ml-4"
              onChange={() => {
                handleOnChange("protocol", "ipv4");
              }}
            />
            <RadioButton
              value={"ipv6"}
              isChecked={state.protocol === "ipv6"}
              textClassName="ml-4"
              onChange={() => {
                handleOnChange("protocol", "ipv6");
              }}
            />
          </section>
        </section>

        <InputBox
          onChange={(event) => {
            handleOnChange("preferred", event.target.value);
          }}
          value={state.preferred}
          title={"preferred_ip_address"}
          isPlaceHolder={false}
        />
        <InputBox
          onChange={(event) => {
            handleOnChange("alternate", event.target.value);
          }}
          value={state.alternate}
          title={"alternate_ip_address"}
          isPlaceHolder={false}
        />
      </section>
      <section className={`${styles.btns} mb-36`}>
        <Button
          onClick={handleSubmit}
          className="mr-6"
          disabled={[
            String(state.name).trim(),
            String(state.preferred).trim(),
            String(state.alternate).trim(),
          ].includes("")}
        >
          <Text text={"save"} className="py-8" />
        </Button>
        <Button
          variant={BTN_VARIANTS.SECONDARY}
          className="ml-6"
          onClick={handleClear}
        >
          <Text text={"clear"} className="py-8" />
        </Button>
      </section>
    </div>
  );
};

export default AddCustomDNS;
