import React from "react";
import styles from "./dns.module.scss";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";
import { useDispatch, useSelector } from "react-redux";
import RadioButton from "../../components/RadioButton";
import Button, { variants } from "../../components/Button";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import { dispatchPutSelectedDNS } from "../../actions/settings.action";
import { withLoader } from "../../actions/loader.action";
const DNSModal = () => {
  const dispatch = useDispatch();
  const available = useSelector((state) => state.dns.available);
  const current = useSelector((state) => state.dns.current);

  const handleOnChangeDNS = (dns) => {
    dispatch(
      withLoader([
        dispatchPutSelectedDNS(dns),
        CHANGE_MODAL_STATE({ show: false, type: null }),
      ])
    );
  };

  return (
    <div className={styles.root}>
      <span className={styles.title}>Select a DNS</span>
      <section className={styles.list}>
        {available.map((dns) => {
          const isChecked = dns.name === current.name;
          return (
            <RadioButton
              value={capitalizeFirstLetter(dns.name)}
              isChecked={isChecked}
              onChange={() => handleOnChangeDNS(dns)}
              key={dns.name}
            />
          );
        })}
      </section>
      <Button
        title={"OK"}
        variant={variants.PRIMARY}
        className={styles["ok-btn"]}
        onClick={() => {
          dispatch(CHANGE_MODAL_STATE({ show: false, type: null }));
        }}
      />
    </div>
  );
};

export default DNSModal;
