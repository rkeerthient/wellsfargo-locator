import { Result } from "@yext/search-headless-react";
import { LngLatLike, Map, Popup } from "mapbox-gl";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom/server";
import { FaCircle } from "react-icons/fa6";
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
  console.log(html);

  return ReactDOM.renderToString(html);
};

export interface MapPinProps {
  mapbox: Map;
  result: Result<Location>;
  selectedLocationId: string;
  setSelectedLocationId: (value: string) => void;
}

const MapPin: React.FC<MapPinProps> = ({
  mapbox,
  result,
  setSelectedLocationId,
}: MapPinProps) => {
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
      console.log("entered", mapboxCoordinate);

      if (mapboxCoordinate) {
        popupRef.current
          .setLngLat(mapboxCoordinate)
          .setHTML(getLocationHTML(location))
          .addTo(mapbox);
      }
      setSelectedLocationId(location.id);
    }
  }, [active, mapbox, location]);

  const handleClick = () => {
    setActive(true);
  };

  return (
    <button onClick={handleClick}>
      <FaCircle className="text-[#d71e2b] h-4 w-4" />
    </button>
  );
};

export default MapPin;
