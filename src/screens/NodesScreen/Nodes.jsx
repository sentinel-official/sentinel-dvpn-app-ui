import React from "react";
import styles from "../styles/nodes-screen.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchNodesAction } from "../../actions/nodes.actions";
import NodeItemCard from "../../components/NodeItemCard";

const Nodes = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const countryId = params.countryId;
  const cityId = params.cityId;

  const { filteredNodes: nodes, isNodesLoading } = useSelector(
    (state) => state.nodes
  );

  React.useLayoutEffect(() => {
    dispatch(fetchNodesAction({ countryId, cityId }));
    return;
  }, [cityId, countryId, dispatch]);

  if (isNodesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.list}>
      {nodes &&
        nodes.map((node) => {
          return (
            <NodeItemCard
              title={node.name}
              description={node.address}
              key={node.id}
              // action={true}
              // dispatcher={SET_SELECTED_CITY(city)}
            />
          );
        })}
    </div>
  );
};

export default Nodes;
