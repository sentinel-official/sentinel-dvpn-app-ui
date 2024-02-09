import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const IndexLayout = () => {
  const { isWalletCreated, isRegistered } = useSelector(
    (state) => state.device
  );
  if (isRegistered && isWalletCreated) {
    return <Navigate to="/app" />;
  }
  return <Navigate to="/onboarding" />;
};

export default IndexLayout;
