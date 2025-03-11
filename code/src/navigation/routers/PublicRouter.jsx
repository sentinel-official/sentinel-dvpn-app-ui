// import useRefferal from "@hooks/use-refferal";
import { useAuthSelector } from "@hooks/use-selector";

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRouter = React.memo(() => {
  const { isAuthenticated } = useAuthSelector();

  // const { fetchRefferalAddress } = useRefferal()
  
  //   React.useEffect(() => {
  //     const res = fetchRefferalAddress();
  //    }, [])

  if (isAuthenticated) {
    return <Navigate to={"/user"} replace={true} />;
  }
  return <Outlet />;
});

export default PublicRouter;
