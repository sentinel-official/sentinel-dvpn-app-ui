import React from "react";
import styles from "../styles/settings-screen.module.scss";
import LegalDocIcon from "../../assets/icons/legal-doc-icon.svg";
import VersionIcon from "../../assets/icons/version-icon.svg";
import DNSIcon from "../../assets/icons/dns-icon.svg";
import Card from "../../components/Card";
import dnsList from "../../constants/dns.constants";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import Button, { variants } from "../../components/Button";
import { CHANGE_SELECTED_DNS } from "../../redux/user.reducer";
import RadioButton from "../../components/RadioButton";

const legalDocs = [
  {
    title: "Terms of Service",
    icon: LegalDocIcon,
    href: "https://www.sentinel.co/terms-of-service.html",
  },
  {
    title: "Privacy Policy",
    icon: LegalDocIcon,
    href: "https://www.sentinel.co/privacy-policy.html",
  },
];

const DNSCard = () => {
  const dispatch = useDispatch();
  const { selectedDNS } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOnChangeDNSValue = (event) => {
    event.preventDefault();
    dispatch(CHANGE_SELECTED_DNS(event.target.value));
    setIsModalOpen(false);
  };

  const DNSListModal = (
    <Modal>
      <div className={styles["dns-list"]}>
        <span className={styles.title}>Choose DNS</span>
        <section className={styles.list}>
          {Object.entries(dnsList).map(([key, value]) => {
            const isChecked = value === selectedDNS;
            return (
              <RadioButton
                value={value}
                isChecked={isChecked}
                onChange={handleOnChangeDNSValue}
                key={key}
              />
            );
          })}
        </section>
        <section className={styles.actions}>
          <Button
            onClick={() => setIsModalOpen(false)}
            title={"OK"}
            variant={variants.primary}
          />
        </section>
      </div>
    </Modal>
  );

  return (
    <div className={styles.container}>
      <span className={styles.title}>DVPN</span>
      <Card>
        <button className={styles.dns} onClick={() => setIsModalOpen(true)}>
          <section>
            <img src={DNSIcon} alt="" />
            <span>DNS</span>
          </section>
          <span className={styles.value}>{selectedDNS}</span>
        </button>
      </Card>
      {isModalOpen && DNSListModal}
    </div>
  );
};

const SettingsScreen = () => {
  const openLegelDoc = (event, href) => {
    event.preventDefault();
    window.open(href);
  };
  return (
    <div className={styles.root}>
      <span className={styles.header}>Settings</span>
      <DNSCard />
      <div className={styles.container}>
        <span className={styles.title}>Legal</span>

        {legalDocs.map((doc) => (
          <Card key={doc.title}>
            <button
              onClick={(event) => openLegelDoc(event, doc.href)}
              className={styles["doc-card"]}
            >
              <img src={doc.icon} alt="" />
              <span>{doc.title}</span>
            </button>
          </Card>
        ))}
        <Card>
          <button className={styles.version}>
            <section>
              <img src={VersionIcon} alt="" />
              <span>App Version</span>
            </section>
            <span className={styles.value}>1.0</span>
          </button>
        </Card>
      </div>
    </div>
  );
};

export default SettingsScreen;
