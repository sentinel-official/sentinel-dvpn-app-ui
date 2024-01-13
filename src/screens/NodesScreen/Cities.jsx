import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/nodes-screen.module.scss";
import { useParams } from "react-router-dom";
import NodeItemCard from "../../components/NodeItemCard";
import { fetchCitiesAction } from "../../actions/nodes.actions";
import { SET_SEARCH_TEXT, SET_SELECTED_CITY } from "../../redux/nodes.reducer";

const Cities = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const countryId = params.countryId;
  const { filteredCities: cities, isCitiesLoading } = useSelector(
    (state) => state.nodes
  );

  React.useLayoutEffect(() => {
    dispatch(SET_SEARCH_TEXT(""));
    dispatch(fetchCitiesAction({ countryId }));
    return;
  }, [countryId, dispatch]);

  if (isCitiesLoading) {
    return <div>Loading...</div>;
  }
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
