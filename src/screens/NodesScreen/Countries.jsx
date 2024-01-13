import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/nodes-screen.module.scss";
import NodeItemCard from "../../components/NodeItemCard";
import {
  SET_SELECTED_CITY,
  SET_SELECTED_COUNTRY,
} from "../../redux/nodes.reducer";

const Countries = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.nodes.filteredCountries);
  
  React.useEffect(() => {
    dispatch(SET_SELECTED_CITY({}));
    dispatch(SET_SELECTED_COUNTRY({}));
  }, [dispatch]);

  return (
    <div className={styles.list}>
      {countries.map((country) => {
        const description = `${Number.parseInt(
          country.servers_available
        ).toLocaleString()} ${
          Number.parseInt(country.servers_available).toLocaleString() > 1
            ? "Nodes"
            : "Node"
        }`;
        return (
          <NodeItemCard
            title={country.name}
            description={description}
            key={country.id}
            navigateTo={`${country.id}/cities`}
            code={country.code}
            action={true}
            dispatcher={SET_SELECTED_COUNTRY(country)}
          />
        );
      })}
    </div>
  );
};

export default Countries;
