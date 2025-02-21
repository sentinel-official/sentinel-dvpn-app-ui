import { useAuthSelector } from "@hooks/use-selector";
import React from "react";
import { Navigate } from "react-router-dom";

const Page404 = () => {
  const { isAuthenticated } = useAuthSelector();
  if (isAuthenticated) {
    return <Navigate to={"/user"} replace={true} />;
  }
  return <Navigate to={"/"} replace={true} />;
};

export default Page404;
