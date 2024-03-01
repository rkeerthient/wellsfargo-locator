import { CardProps } from "@yext/search-ui-react";
import { BsPin } from "react-icons/bs";
import { CiCalendar, CiPhone } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";
import { FaDirections } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import Ce_allEntities from "../types/all_entities";
import { getIconSwitch } from "./MapPin";
import { useLocationsContext } from "../common/LocationsContext";

const LocationCard = ({ result }: CardProps<Ce_allEntities>) => {
  const {
    hoveredLocationId,
    setHoveredLocationId,
    selectedLocationId,
    setSelectedLocationId,
  } = useLocationsContext();

  const { name } = result;
  const {
    id,
    address,
    mainPhone,
    c_category,
    photoGallery,
    c_primaryCTA,
    c_secondaryCTA,
  } = result.rawData;

  const getDirectionsUrl = (addr?: any) => {
    const region = addr.region ? ` ${addr.region}` : ``;
    const rawQuery = `${addr.line1},${addr.city},${region} ${addr.postalCode} ${addr.countryCode}`;
    const query = encodeURIComponent(rawQuery);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}&output=classic`;
    return url;
  };

  const handleClick = () => {
    setHoveredLocationId(id);
    setSelectedLocationId(id);
  };

  return (
    <div
      className="border rounded-sm bg-[#f9f7f6] py-4 pl-4 flex gap-2 hover:border-[#d61f2b] items-center justify-between"
      onClick={handleClick}
    >
      <div>
        {c_category === "Financial Professional" &&
        photoGallery &&
        photoGallery[0] ? (
          <img src={photoGallery[0].image.url} alt="" className="h-auto w-24" />
        ) : (
          getIconSwitch(c_category!, `h-auto w-24`)
        )}
      </div>
      <div className="flex flex-col gap-2 justify-between text-[#787777]">
        <div className="font-bold text-[#141414]">{name}</div>
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
        <div className="flex gap-2 items-center text-sm">
          <div>
            <BsPin />
          </div>
          <div className="flex flex-col  ">
            <div>
              {address?.line1}, {address?.city}, {address?.region},{" "}
              {address?.postalCode}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-1/3">
        {c_primaryCTA && (
          <a
            href={
              c_primaryCTA.label === "Get Directions"
                ? getDirectionsUrl(address)
                : c_primaryCTA.link || `#`
            }
            target="_blank"
            className="flex gap-2 hover:underline hover:cursor-pointer items-center text-sm text-[#8982a7]"
          >
            {c_primaryCTA.label == "Get Directions" ? (
              <FaDirections />
            ) : (
              <CiCalendar />
            )}
            <div>{c_primaryCTA.label}</div>
          </a>
        )}
        {c_secondaryCTA && (
          <a
            href={c_secondaryCTA.link ? c_secondaryCTA.link : "#"}
            target="_blank"
            className="flex gap-2 hover:underline hover:cursor-pointer items-center text-sm text-[#8982a7]"
          >
            {["Visit my page", "Visit our site"].includes(
              c_secondaryCTA.label!
            ) ? (
              <TbWorldWww />
            ) : (
              <FaArrowRight />
            )}{" "}
            <div>{c_secondaryCTA.label}</div>
          </a>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
