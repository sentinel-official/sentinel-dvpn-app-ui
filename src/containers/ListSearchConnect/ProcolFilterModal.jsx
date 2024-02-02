import React from "react";
import styles from "./styles.module.scss";
import Modal from "../../components/Modal";
import Button, { variants } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import RadioButton from "../../components/RadioButton";
import { CHANGE_PROTOCOL } from "../../redux/device.reducer";

const protocols = { ALL: "", V2RAY: "V2RAY", WIREGUARD: "WIREGUARD" };

const ProcolFilterModal = ({ onCancel }) => {
  const dispatch = useDispatch();
  const { protocol } = useSelector((state) => state.device);
  return (
    <Modal>
      <div className={styles["protocol-filter-modal"]}>
        <span className={styles.heading}>Filter by Protocol</span>
        <section className={styles.list}>
          {Object.entries(protocols)?.map(([key, value]) => {
            const isChecked = value === protocol;
            return (
              <RadioButton
                value={key}
                isChecked={isChecked}
                onChange={() => {
                  dispatch(CHANGE_PROTOCOL(value));
                  onCancel();
                }}
                key={key}
              />
            );
          })}
        </section>
        <Button variant={variants.primary} onClick={onCancel} title={"OK"} />
      </div>
    </Modal>
  );
};

export default ProcolFilterModal;
