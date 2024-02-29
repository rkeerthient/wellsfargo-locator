import { CardProps } from "@yext/search-ui-react";
import { BsPin } from "react-icons/bs";
import { CiCalendar, CiPhone } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";
import { FaDirections } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import Ce_allEntities from "../types/all_entities";

const LocationCard = ({ result }: CardProps<Ce_allEntities>) => {
  // const { hoveredLocationId, setHoveredLocationId, setClicked } =
  //   useMapContext();

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
  console.log(JSON.stringify(result.rawData));

  const getDirectionsUrl = (addr?: any) => {
    const region = addr.region ? ` ${addr.region}` : ``;
    const rawQuery = `${addr.line1},${addr.city},${region} ${addr.postalCode} ${addr.countryCode}`;
    const query = encodeURIComponent(rawQuery);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}&output=classic`;
    return url;
  };

  return (
    <div
      className="border rounded-sm bg-[#f9f7f6] py-4 pl-4 flex gap-2 hover:border-[#d61f2b] items-center justify-between"
      // onMouseEnter={() => {
      //   setHoveredLocationId(id);
      // }}
      // onMouseLeave={() => {
      //   setHoveredLocationId("");
      // }}
      // onClick={() => setClicked(id)}
      // className={`flex justify-between border-y p-4 hover:cursor-pointer  ${
      //   hoveredLocationId === id ? "bg-gray-200" : ""
      // }`}
    >
      <div>
        {c_category === "ATM" ? (
          <img
            src="https://cdn-icons-png.freepik.com/512/2385/2385270.png"
            alt=""
            className="h-auto w-24"
          />
        ) : c_category === "Bank" ? (
          <img
            src="https://cdn-icons-png.flaticon.com/512/2830/2830155.png"
            alt=""
            className="h-auto w-24"
          />
        ) : "Financial Professional" && photoGallery ? (
          <img src={photoGallery[0].image.url} alt="" className="h-auto w-24" />
        ) : (
          <img
            src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
            alt=""
            className="h-auto w-24"
          />
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
              c_primaryCTA.link === "Get Directions"
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
          <a href={c_secondaryCTA.link ? c_secondaryCTA.link:'#' } target="_blank" className="flex gap-2 hover:underline hover:cursor-pointer items-center text-sm text-[#8982a7]">
            {["Visit my page", "Visit our site"].includes(
              c_secondaryCTA.label!
            ) ? (
              <TbWorldWww />
            ) : (
              <FaArrowRight />
            )}{" "}
            <div>{c_secondaryCTA.label}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
