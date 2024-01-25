import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./styles/list-layout.module.scss";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import Button, { variants } from "../components/Button";
import BackIcon from "../assets/icons/back-icon.svg";
import ListSearchConnect from "../containers/ListSearchConnect";

const ListLayout = () => {
  const navigate = useNavigate();
  const { pageTitle, shouldNavBack } = useSelector((state) => state.nodes);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <Card>
          <section className={`${styles["page-details"]} `}>
            {shouldNavBack && (
              <Button
                icon={BackIcon}
                className={styles["back-button"]}
                onClick={() => navigate(-1)}
                variant={variants.primary}
              />
            )}
            <section
              className={`${styles.title} ${
                shouldNavBack ? styles["make-center"] : ""
              }`}
            >
              <span>{pageTitle}</span>
            </section>
          </section>
        </Card>
        <ListSearchConnect />
      </div>
      <Outlet />
    </div>
  );
};

export default ListLayout;
