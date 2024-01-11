import React from "react";
import { Outlet } from "react-router-dom";

const ListLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ListLayout;
