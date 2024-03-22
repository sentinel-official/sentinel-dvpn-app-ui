import React from "react";
import styles from "./dns.module.scss";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import { dispatchPutSelectedDNS } from "../../actions/settings.action";
import { withLoader } from "../../actions/loader.action";
import CheckIcon from "../../assets/icons/check-icon.svg";

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
        {available &&
          available.length > 0 &&
          available.map((dns) => {
            const isChecked = dns.name === current.name;
            return (
              <button
                className={styles["dns-item"]}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleOnChangeDNS(dns);
                }}
              >
                <span
                  className={`${
                    isChecked ? styles["text-selected"] : styles.text
                  }`}
                >
                  {capitalizeFirstLetter(dns.name)}
                </span>
                {isChecked && <img src={CheckIcon} alt="" />}
              </button>
            );
          })}
      </section>
    </div>
  );
};

export default DNSModal;
