import { useAuthSelector } from "@hooks/use-selector";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRouter = React.memo(() => {
  const { isAuthenticated } = useAuthSelector();

  if (isAuthenticated) {
    return <Navigate to={"/user"} replace={true} />;
  }
  return <Outlet />;
});

export default PublicRouter;
