// import { Result } from "@yext/search-headless-react";
// import { LngLatLike, Map, Popup } from "mapbox-gl";
// import * as React from "react";
// import { useCallback, useEffect, useRef, useState } from "react";
// import * as ReactDOM from "react-dom/server";
// import { FaCircle } from "react-icons/fa6";
// import { useLocationsContext } from "../common/LocationsContext";
// import { Coordinate } from "@yext/pages-components";
// import Location from "../types/locations";
// const transformToMapboxCoord = (
//   coordinate: Coordinate
// ): LngLatLike | undefined => {
//   if (!coordinate.latitude || !coordinate.longitude) return;
//   return {
//     lng: coordinate.longitude,
//     lat: coordinate.latitude,
//   };
// };

// const getLocationHTML = (location: any) => {
//   const address = location.address;
//   const html = (
//     <div>
//       <p className="font-bold">{location.name || "unknown location"}</p>
//       <p>{location.address.line1}</p>
//       <p>{`${address.city}, ${address.region}, ${address.postalCode}`}</p>
//     </div>
//   );
//   return ReactDOM.renderToString(html);
// };

// export interface MapPinProps {
//   mapbox: Map;
//   result: Result<Location>;
// }

// const MapPin: React.FC<MapPinProps> = ({ mapbox, result }: MapPinProps) => {
//   const { hoveredLocationId, setHoveredLocationId } = useLocationsContext();

//   useEffect(() => {
//     hoveredLocationId && console.log(hoveredLocationId);
//   }, [hoveredLocationId]);

//   const location = result.rawData;
//   const [active, setActive] = useState(false);
//   const popupRef = useRef(
//     new Popup({ offset: 15 }).on("close", () => setActive(false))
//   );
//   useEffect(() => {
//     if (active && location.yextDisplayCoordinate) {
//       const mapboxCoordinate = transformToMapboxCoord(
//         location.yextDisplayCoordinate
//       );
//       if (mapboxCoordinate) {
//         popupRef.current
//           .setLngLat(mapboxCoordinate)
//           .setHTML(getLocationHTML(location))
//           .addTo(mapbox);
//       }
//     }
//   }, [active, mapbox, location]);

//   const handleClick = useCallback(() => {
//     setActive(true);
//   }, []);

//   const updateHoveredLocation = () => {
//     setHoveredLocationId(location.id);
//   };

//   const removeHoveredLocation = () => {
//     setHoveredLocationId("");
//   };

//   return (
//     <button
//       onClick={handleClick}
//       onMouseEnter={updateHoveredLocation}
//       onMouseLeave={removeHoveredLocation}
//     >
//       <FaCircle className="text-[#d71e2b] h-4 w-4" />
//     </button>
//   );
// };

// export default MapPin;

// you need to install react icons (npm i react-icons) to use this icon
import { BiMapPin } from "react-icons/bi";
import { PinComponent, Coordinate } from "@yext/search-ui-react";
import { Popup, LngLatLike } from "mapbox-gl";
import { useCallback, useEffect, useRef, useState } from "react";
// transforms the Yext Display Coordiate into the format that Mapbox expects
const transformToMapboxCoord = (coordinate: Coordinate): LngLatLike => ({
  lng: coordinate.longitude,
  lat: coordinate.latitude,
});

const MapPin: PinComponent<Location> = (props) => {
  const { mapbox, result } = props;

  // grab the coordinates from the result
  const yextCoordinate = result.rawData.yextDisplayCoordinate;

  // manage the open state of the popup with useState and useRef
  const [active, setActive] = useState(false);
  const popupRef = useRef(
    new Popup({ offset: 15 }).on("close", () => setActive(false))
  );

  useEffect(() => {
    // render the popup on the map when the active state changes
    if (active && yextCoordinate) {
      popupRef.current
        .setLngLat(transformToMapboxCoord(yextCoordinate))
        .setText(result.name || "unknown location")
        .addTo(mapbox);
    }
  }, [active, mapbox, result, yextCoordinate]);

  // create a callback to open the popup on click
  const handleClick = useCallback(() => {
    setActive(true);
  }, []);

  return (
    // return the pin component with the onClick handler
    <BiMapPin
      className="text-red"
      size={30}
      color={"red"}
      onClick={handleClick}
    />
  );
};

export default MapPin;
