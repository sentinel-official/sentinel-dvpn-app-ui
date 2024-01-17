export const isValidSession = (session, subscription, selectedNode) => {
  console.log(session, subscription, selectedNode);
  if (
    session &&
    session.status === "STATUS_ACTIVE" &&
    session.subscriptionId === String(subscription.base.id) &&
    session.nodeAddress === selectedNode.address
  ) {
    return true;
  }
  return false;
};
