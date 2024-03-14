import React from "react";
import styles from "./no-balance.module.scss";
import BalanceIcon from "../../assets/icons/balance-icon.svg";
import Button, { variants } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";
import { useNavigate } from "react-router-dom";

const NoBalanceModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { balance } = useSelector((state) => state.home);

  return (
    <div className={styles["no-balance-modal"]}>
      <span className={styles.title}>No Balance</span>
      <span className={styles.description}>
        You have no balance in your account!
      </span>
      <section className={styles.balance}>
        <img src={BalanceIcon} alt="" />
        <span className={styles.amount}>{balance} DVPN</span>
      </section>
      <Button
        variant={variants.PRIMARY}
        className={styles["ok-btn"]}
        onClick={() => {
          dispatch(CHANGE_MODAL_STATE({ show: false, type: "" }));
          navigate("/account");
        }}
        title={"Add Balance"}
      />
    </div>
  );
};

export default NoBalanceModal;
