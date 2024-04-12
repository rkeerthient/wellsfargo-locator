import { Result } from "@yext/search-headless-react";
import { LngLatLike, Map, Popup } from "mapbox-gl";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom/server";
import { FaCircle } from "react-icons/fa6";
import { useLocationsContext } from "../common/LocationsContext";
import { Coordinate } from "@yext/pages-components";
import Location from "../types/locations";
const transformToMapboxCoord = (
  coordinate: Coordinate
): LngLatLike | undefined => {
  if (!coordinate.latitude || !coordinate.longitude) return;
  return {
    lng: coordinate.longitude,
    lat: coordinate.latitude,
  };
};

const getLocationHTML = (location: Location) => {
  const address = location.address;
  const html = (
    <div>
      <p className="font-bold">{location.name || "unknown location"}</p>
      <p>{location.address.line1}</p>
      <p>{`${address.city}, ${address.region}, ${address.postalCode}`}</p>
    </div>
  );
  return ReactDOM.renderToString(html);
};

export interface MapPinProps {
  mapbox: Map;
  result: Result<Location>;
}

const MapPin: React.FC<MapPinProps> = ({ mapbox, result }: MapPinProps) => {
  const { hoveredLocationId, setHoveredLocationId } = useLocationsContext();
  const divRef = useRef();
  const location = result.rawData;
  const [active, setActive] = useState(false);
  const popupRef = useRef(
    new Popup({ offset: 15 }).on("close", () => setActive(false))
  );
  useEffect(() => {
    hoveredLocationId && console.log(hoveredLocationId);
  }, [hoveredLocationId]);

  const scrollToElement = () => {
    const { current } = divRef;
    if (current !== null) {
      current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (active && location.yextDisplayCoordinate) {
      const mapboxCoordinate = transformToMapboxCoord(
        location.yextDisplayCoordinate
      );
      if (mapboxCoordinate) {
        popupRef.current
          .setLngLat(mapboxCoordinate)
          .setHTML(getLocationHTML(location))
          .addTo(mapbox);
      }
    }
  }, [active, mapbox, location]);

  const handleClick = useCallback(() => {
    setActive(true);
  }, []);

  const updateHoveredLocation = () => {
    setHoveredLocationId(location.id);
  };

  const removeHoveredLocation = () => {
    setHoveredLocationId("");
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={updateHoveredLocation}
      onMouseLeave={removeHoveredLocation}
    >
      <FaCircle className="text-[#d71e2b] h-4 w-4" />
    </button>
  );
};

export default MapPin;
