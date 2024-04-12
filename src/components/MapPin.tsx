import { Result } from "@yext/search-headless-react";
import { LngLatLike, Map, Popup } from "mapbox-gl";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom/server";
import { CiBank } from "react-icons/ci";
import Ce_allEntities, { Coordinate } from "../types/all_entities";
import { GrAtm } from "react-icons/gr";
import { FaCircle, FaHouseUser, FaUser } from "react-icons/fa6";
import { LiaPiggyBankSolid } from "react-icons/lia";
import { PiUsersFourLight } from "react-icons/pi";
import { useLocationsContext } from "../common/LocationsContext";
const transformToMapboxCoord = (
  coordinate: Coordinate
): LngLatLike | undefined => {
  if (!coordinate.latitude || !coordinate.longitude) return;
  return {
    lng: coordinate.longitude,
    lat: coordinate.latitude,
  };
};

const getLocationHTML = (location: any) => {
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
  result: Result<Ce_allEntities>;
}

const MapPin: React.FC<MapPinProps> = ({ mapbox, result }: MapPinProps) => {
  const { hoveredLocationId, setHoveredLocationId } = useLocationsContext();

  useEffect(() => {
    hoveredLocationId && console.log(hoveredLocationId);
  }, [hoveredLocationId]);

  const location = result.rawData;
  const [active, setActive] = useState(false);
  const popupRef = useRef(
    new Popup({ offset: 15 }).on("close", () => setActive(false))
  );
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
