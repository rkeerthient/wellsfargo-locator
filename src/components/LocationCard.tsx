import { CardProps } from "@yext/search-ui-react";
import { BsPin } from "react-icons/bs";
import { CiPhone } from "react-icons/ci";
import { useLocationsContext } from "../common/LocationsContext";
import Location from "../types/locations";
import { LuMapPin } from "react-icons/lu";
import Professional from "./Professional";
import { useEffect } from "react";
const LocationCard = ({ result }: CardProps<Location>) => {
  const { name, id } = result;
  const { address, mainPhone, c_locationProfessional } = result.rawData;
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
      className="w-full border  rounded-sm bg-[#f9f7f6]  flex flex-col "
    >
      <div className="  px-4 py-4 flex gap-2 items-center justify-between">
        <div className="flex flex-col text-sm w-full gap-2 justify-between text-black">
          <div className="flex w-full justify-between">
            <div className="font-bold text-base text-[#141414]">{name}</div>
            <div className="">12mi</div>
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
        </div>
      </div>
      {c_locationProfessional && (
        <Professional result={c_locationProfessional} />
      )}
    </div>
  );
};

export default LocationCard;
