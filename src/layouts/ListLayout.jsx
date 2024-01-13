import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styles from "./styles/list-layout.module.scss";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_SELECTED_CITY,
  SET_SELECTED_COUNTRY,
} from "../redux/nodes.reducer";
import Button, { variants } from "../components/Button";
import BackIcon from "../assets/icons/back-icon.svg";
import ListSearchConnect from "../containers/ListSearchConnect";

const ListLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { selected } = useSelector((state) => state.nodes);
  const [title, setTitle] = React.useState("");
  const [shouldNavBack, setShouldNavBack] = React.useState(false);

  React.useLayoutEffect(() => {
    if (params.countryId && params.cityId) {
      const title = selected.city.name ? selected.city.name : "Select a Node";
      setTitle(title);
      setShouldNavBack(true);
      return;
    } else if (params.countryId) {
      const title = selected.country.name
        ? selected.country.name
        : "Select a City";
      setTitle(title);
      setShouldNavBack(true);
      return;
    } else {
      const title = "Select a Country";
      setTitle(title);
      setShouldNavBack(false);
    }
  }, [
    params.countryId,
    params.cityId,
    selected.country.name,
    selected.city.name,
  ]);

  const handleNavBack = () => {
    if (selected?.country?.name && selected?.city?.name) {
      dispatch(SET_SELECTED_CITY({}));
      navigate(-1);
      return;
    }

    if (selected?.country?.name) {
      dispatch(SET_SELECTED_COUNTRY({}));
      navigate(-1);
      return;
    }
    navigate(-1);
    return;
  };

  return (
    <div>
      <div className={styles.header}>
        <Card>
          <section className={`${styles["page-details"]} `}>
            {shouldNavBack && (
              <Button
                icon={BackIcon}
                className={styles["back-button"]}
                onClick={handleNavBack}
                variant={variants.primary}
              />
            )}
            <section
              className={`${styles.title} ${
                shouldNavBack ? styles["make-center"] : ""
              }`}
            >
              <span>{title}</span>
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
