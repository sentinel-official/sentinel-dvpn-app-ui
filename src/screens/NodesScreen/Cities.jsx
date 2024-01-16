import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/nodes-screen.module.scss";
import { useParams } from "react-router-dom";
import NodeItemCard from "../../components/NodeItemCard";
import { fetchCitiesAction } from "../../actions/nodes.actions";
import {
  SET_PAGE_HEADER,
  SET_SEARCH_TEXT,
  SET_SELECTED_CITY,
} from "../../redux/nodes.reducer";
import { withLoader } from "../../actions/loader.actions";

const Cities = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const countryId = params.countryId;
  const { filteredCities: cities, selected } = useSelector(
    (state) => state.nodes
  );
  React.useLayoutEffect(() => {
    dispatch(SET_SEARCH_TEXT(""));
    dispatch(
      withLoader({
        dispatchers: [fetchCitiesAction({ countryId })],
        message: "Loading Cities...",
      })
    );
    dispatch(
      SET_PAGE_HEADER({
        pageTitle: `${
          selected?.country?.name ? selected?.country?.name : "Select a City"
        }`,
        shouldNavBack: true,
      })
    );
    return;
  }, [countryId, dispatch, selected?.country?.name]);

  return (
    <div className={styles.list}>
      {cities &&
        cities.map((city) => {
          const description = `${Number.parseInt(
            city.servers_available
          ).toLocaleString()} ${
            Number.parseInt(city.servers_available) > 1 ? "Nodes" : "Node"
          }`;
          return (
            <NodeItemCard
              title={city.name}
              description={description}
              key={city.id}
              navigateTo={`${city.id}/nodes`}
              action={true}
              dispatcher={SET_SELECTED_CITY(city)}
            />
          );
        })}
    </div>
  );
};

export default Cities;
