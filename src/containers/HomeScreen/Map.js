import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import ReactMapGl from "react-map-gl";
import { useSelector } from "react-redux";

const REACT_APP_MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYmFzZWRhcHBzIiwiYSI6ImNsbjMza2I0NjBmYjgycm5rODM4d2I4ODEifQ.Mr0qLSfbCOoChGbAHvOo8g";
const REACT_APP_MAP_STYLE =
  "mapbox://styles/basedapps/clorr29u400oq01qybkxo563d";

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

const Map = () => {
  const mapRef = React.useRef();
  const { latitude, longitude } = useSelector((state) => state.home);

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

  const reactMapGl = React.useMemo(() => {
    return (
      <ReactMapGl
        mapLib={import("mapbox-gl")}
        ref={mapRef}
        onLoad={onLoad}
        initialViewState={{
          bearing: 0,
          pitch: 0,
          latitude: latitude,
          longitude: longitude,
          zoom: zoom,
        }}
        style={{
          width: "100vw",
          height: `${window.innerHeight - 80}px`,
          overflow: "hidden",
        }}
        cursor="default"
        zoom={zoom}
        mapboxAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle={REACT_APP_MAP_STYLE}
        {...mapSettings}
      />
    );
  }, [latitude, longitude, onLoad]);

  return <>{reactMapGl}</>;
};

export default Map;
