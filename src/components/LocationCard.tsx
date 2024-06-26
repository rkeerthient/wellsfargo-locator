import { CardProps } from "@yext/search-ui-react";
import { useEffect } from "react";
import { CiPhone } from "react-icons/ci";
import { LuMapPin } from "react-icons/lu";
import { useLocationsContext } from "../common/LocationsContext";
import Location from "../types/locations";
import Professional from "./Professional";
import { HoursStatus, getDirections } from "@yext/pages-components";

const LocationCard = ({ result }: CardProps<Location>) => {
  const { name, id, distance } = result;
  const {
    address,
    mainPhone,
    c_locationProfessional,
    hours,
    c_typeOfLocation,
  } = result.rawData;

  const { selectedLocationId, setSelectedLocationId } = useLocationsContext();
  const getDirectionsUrl = (addr?: any) => {
    const region = addr.region ? ` ${addr.region}` : ``;
    const rawQuery = `${addr.line1},${addr.city},${region} ${addr.postalCode} ${addr.countryCode}`;
    const query = encodeURIComponent(rawQuery);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}&output=classic`;
    return url;
  };

  useEffect(() => {
    const element = document.getElementById(selectedLocationId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [selectedLocationId]);

  return (
    <div
      id={id}
      onClick={() => setSelectedLocationId(id)}
      className={`w-full border  rounded-sm bg-[#f9f7f6]  flex flex-col ${selectedLocationId === id && `ring-2 ring-zinc-700`}`}
    >
      <div className="  px-4 py-4 flex gap-2 items-center justify-between">
        <div className="flex flex-col text-sm w-full gap-2 justify-between text-black">
          <div className="flex w-full justify-between">
            <div className="font-bold text-base text-[#141414]">{name}</div>
            <div className=" ">{convertAndRoundMetersToMiles(distance)}mi</div>
          </div>
          <div className="flex gap-2 items-center text-sm">
            <div>
              <LuMapPin />
            </div>
            <div className="flex flex-col  ">
              <div>
                {address?.line1}, {address?.city}, {address?.region},{" "}
                {address?.postalCode}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div>
              <CiPhone />
            </div>
            <div>
              {mainPhone
                ? mainPhone
                    .replace("+1", "")
                    .replace(/\D+/g, "")
                    .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
                : `(610) 363-8020`}
            </div>
          </div>
          {hours && (
            <div className="font-semibold">
              <HoursStatus timez hours={hours} dayOfWeekTemplate={() => null} />
            </div>
          )}

          {c_typeOfLocation &&
            (c_typeOfLocation[0].includes("Bank") ||
              c_typeOfLocation[0] === "ATM") && (
              <div className="flex gap-2  mt-4">
                <a
                  href={getDirectionsUrl(address)}
                  className="border px-4 py-2 bg-[#d61f28] hover:cursor-pointer text-white"
                >
                  Get Directions
                </a>
                <div className="border px-4 py-2 bg-[#d61f28] hover:cursor-pointer text-white">
                  Book an Appointment
                </div>
              </div>
            )}
        </div>
      </div>
      {c_locationProfessional && (
        <Professional result={c_locationProfessional} />
      )}
    </div>
  );
};
const convertAndRoundMetersToMiles = (meters: any) => {
  const metersToMilesFactor = 1609.344;
  let miles = meters / metersToMilesFactor;
  return Math.round(miles / 0.5) * 0.5;
};
export default LocationCard;
