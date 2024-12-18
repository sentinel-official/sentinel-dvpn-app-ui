import { useVPNSelector } from "@hooks/use-selector";
import React, {
  useRef,
  useState,
  useLayoutEffect,
  useMemo,
  useCallback,
} from "react";
import MapSvg from "@svgs/map.svg";
import styles from "./map.module.scss";

var pointZero = { x: 0.4981273408, y: 0.6960227273 };

const mapBounds = {
  latMin: -58.55,
  latMax: 83.62,
  lonMin: -180,
  lonMax: 180,
};

const normalizeLatitude = (lat) => {
  return Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 180 / 2));
};

const getCoords = (latitude, longitude, mapWidth, mapHeight) => {
  var x = 0;
  var y = 0;
  if (latitude > 0) {
    y =
      mapHeight *
      pointZero.y *
      (1 - normalizeLatitude(latitude) / normalizeLatitude(mapBounds.latMax));
  }

  if (latitude < 0) {
    y =
      mapHeight * pointZero.y +
      (mapHeight - mapHeight * pointZero.y) *
        (normalizeLatitude(latitude) / normalizeLatitude(mapBounds.latMin));
  }

  if (longitude > 0) {
    x =
      mapWidth * pointZero.x +
      (mapWidth - mapWidth * pointZero.x) * (longitude / mapBounds.lonMax);
  }

  if (longitude < 0) {
    x =
      mapWidth * pointZero.x -
      mapWidth * pointZero.x * (longitude / mapBounds.lonMin);
  }

  return { x, y };
};

const Map = () => {
  const mapRef = useRef();
  const { latitude, longitude } = useVPNSelector();
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const dimensions = useMemo(() => {
    if (mapRef.current) {
      const { clientWidth = 0, clientHeight = 0 } = mapRef.current;
      return { width: clientWidth, height: clientHeight };
    }
    return { width: 0, height: 0 };
  }, [mapRef.current]);

  useLayoutEffect(() => {
    const mapWidth = dimensions.width;
    const mapHeight = dimensions.height;
    const coords = getCoords(latitude, longitude, mapWidth, mapHeight);
    setTransform(coords);
  }, [latitude, longitude, dimensions.width, dimensions.height]);

  const backgroundPosition = useMemo(() => {
    const x = `${(transform.x / dimensions.width) * 100}%`;
    const y = `${(transform.y / dimensions.height) * 100}%`;
    return `${x} ${y}`;
  }, [dimensions.width, dimensions.height, transform.x, transform.y]);

  return (
    <div
      className={styles.root}
      style={{
        backgroundImage: `url(${MapSvg})`,
        backgroundPosition,
        backgroundSize: `auto 100%`,
        transition: "background-position 0.1s ease-in-out",
      }}
      ref={mapRef}
    >
      {!(transform.x === 0 && transform.y === 0) && (
        <div
          className={styles.dot}
          style={{
            left: `${transform.x}px`,
            top: `${transform.y}px`,
          }}
        />
      )}
    </div>
  );
};

export default Map;
