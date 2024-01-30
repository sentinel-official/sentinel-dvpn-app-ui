import React from "react";
import styles from "../styles/settings-screen.module.scss";
import LegalDocIcon from "../../assets/icons/legal-doc-icon.svg";
import VersionIcon from "../../assets/icons/version-icon.svg";
import DNSIcon from "../../assets/icons/dns-icon.svg";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import Button, { variants } from "../../components/Button";
import RadioButton from "../../components/RadioButton";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import { changeCurrentDNS } from "../../actions/user.actions";
import { withLoader } from "../../actions/loader.actions";

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
  const { currentDNS, availableDNS, isVPNConnected } = useSelector(
    (state) => state.device
  );

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOnChangeDNSValue = (event, dns) => {
    event.preventDefault();

    dispatch(withLoader({ dispatchers: [changeCurrentDNS(dns)] }));
    setIsModalOpen(false);
  };

  const DNSListModal = (
    <Modal>
      <div className={styles["dns-list"]}>
        <span className={styles.title}>Choose DNS</span>
        <section className={styles.list}>
          {availableDNS?.map((dns) => {
            const isChecked = dns.name === currentDNS.name;
            return (
              <RadioButton
                value={capitalizeFirstLetter(dns.name)}
                isChecked={isChecked}
                onChange={(event) => handleOnChangeDNSValue(event, dns)}
                key={dns.name}
              />
            );
          })}
        </section>
        <Button
          onClick={() => setIsModalOpen(false)}
          title={"OK"}
          variant={variants.primary}
        />
      </div>
    </Modal>
  );

  return (
    <div className={styles.container}>
      <span className={styles.title}>DVPN</span>
      <Card>
        <button
          disabled={isVPNConnected}
          className={styles.dns}
          onClick={() => setIsModalOpen(true)}
        >
          <section>
            <img src={DNSIcon} alt="" />
            <span>DNS</span>
          </section>
          <span className={styles.value}>
            {capitalizeFirstLetter(currentDNS.name)}
          </span>
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
