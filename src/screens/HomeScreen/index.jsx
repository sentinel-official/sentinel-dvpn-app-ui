import React from "react";
import Map from "../../components/Map";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { latitude, longitude } = useSelector((state) => state.map);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Map latitude={latitude} longitude={longitude} />
    </div>
  );
};

export default React.memo(HomeScreen);
