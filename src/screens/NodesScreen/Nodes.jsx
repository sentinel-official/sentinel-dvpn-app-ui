import React from "react";
import styles from "../styles/nodes-screen.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchNodesAction } from "../../actions/nodes.actions";
import NodeItemCard from "../../components/NodeItemCard";
import { SET_PAGE_HEADER } from "../../redux/nodes.reducer";
import { withLoader } from "../../actions/loader.actions";
import { CHANGE_SELECTED_NODE } from "../../redux/device.reducer";
import {
  SHOW_NO_BALANCE,
  SHOW_RENEW_SUBSCRIPTION,
} from "../../redux/alerts.reducer";
import { connectAction } from "../../actions/vpn.actions";

const Nodes = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const countryId = params.countryId;
  const cityId = params.cityId;

  const { filteredNodes: nodes, selected } = useSelector(
    (state) => state.nodes
  );

  const { balance, subscription } = useSelector((state) => state.account);

  React.useLayoutEffect(() => {
    dispatch(
      withLoader({
        dispatchers: [
          fetchNodesAction({
            countryId,
            cityId,
            city: selected?.city?.name,
            country: selected?.country?.name,
            countryCode: selected?.country?.code,
          }),
        ],
        message: "Loading Nodes...",
      })
    );
    dispatch(
      SET_PAGE_HEADER({
        pageTitle: `${
          selected?.city?.name && selected?.country?.code
            ? `${selected?.city?.name}, ${selected?.country?.code}`
            : "Select a Node"
        }`,
        shouldNavBack: true,
      })
    );
    return;
  }, [
    cityId,
    countryId,
    dispatch,
    selected?.city?.name,
    selected?.country?.code,
    selected?.country?.name,
  ]);

  const connect = (node) => {
    if (balance === 0) {
      dispatch(SHOW_NO_BALANCE(true));
      return;
    }
    if (subscription && Object.keys(subscription).length > 0) {
      dispatch(
        withLoader({ dispatchers: [connectAction({ node, subscription })] })
      );
      return;
    }
    dispatch(SHOW_RENEW_SUBSCRIPTION(true));
  };

  return (
    <div className={styles.list}>
      {nodes &&
        nodes.map((node) => {
          return (
            <NodeItemCard
              title={node.name}
              description={node.address}
              key={node.id}
              dispatcher={CHANGE_SELECTED_NODE({
                ...node,
                city: selected?.city?.name,
                country: selected?.country?.name,
                countryCode: selected?.country?.code,
              })}
              onSelect={() => connect(node)}
            />
          );
        })}
    </div>
  );
};

export default Nodes;
