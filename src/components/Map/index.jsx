import "mapbox-gl/dist/mapbox-gl.css";

import React, { useRef } from "react";
import ReactMapGl from "react-map-gl";

const mapSettings = {
  doubleClickZoom: true,
  dragPan: false,
  dragRotate: false,
  interactive: false,
  maxPitch: 0,
  maxZoom: 20,
  minPitch: 0,
  minZoom: 2.5,
  renderWorldCopies: false,
  touchPitch: false,
  touchZoomRotate: false,
  attributionControl: false,
};

const zoom = [7];

const Map = ({ latitude, longitude }) => {
  const mapRef = useRef();

  const handleFlyTo = (latitude, longitude) => {
    if (mapRef && mapRef?.current) {
      mapRef.current?.flyTo({
        center: [longitude, latitude],
        duration: 1000,
        essential: true,
        zoom,
      });
    }
  };

  React.useLayoutEffect(() => {
    handleFlyTo(latitude, longitude);
  }, [longitude, latitude]);

  const onLoad = React.useCallback(() => {
    const map = mapRef.current.getMap();
    map.keyboard.disableRotation();
    map.touchZoomRotate.disableRotation();
  }, []);

  return (
    <ReactMapGl
      ref={mapRef}
      onLoad={onLoad}
      initialViewState={{
        bearing: 0,
        pitch: 0,
        latitude: latitude,
        longitude: longitude,
        zoom: zoom,
      }}
      style={{ width: "100%", height: "100%" }}
      cursor="default"
      zoom={zoom}
      mapboxAccessToken="pk.eyJ1IjoiYmFzZWRhcHBzIiwiYSI6ImNsbjMza2I0NjBmYjgycm5rODM4d2I4ODEifQ.Mr0qLSfbCOoChGbAHvOo8g"
      mapStyle="mapbox://styles/basedapps/clorr29u400oq01qybkxo563d"
      {...mapSettings}
    />
  );
};

export default React.memo(Map);
