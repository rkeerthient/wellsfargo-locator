import { CardProps } from "@yext/search-ui-react";
import { BsClock, BsGlobe, BsPin } from "react-icons/bs";
import { CiPhone } from "react-icons/ci";
import { LiaDirectionsSolid } from "react-icons/lia";
import HoursText from "./HoursText";
import { useMapContext } from "./Locator";
import Ce_allEntities from "../types/all_entities";
import { PiBank } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa6";

const LocationCard = ({ result }: CardProps<Ce_allEntities>) => {
  // const { hoveredLocationId, setHoveredLocationId, setClicked } =
  //   useMapContext();

  const { name } = result;
  const { id, address, mainPhone, c_category, photoGallery } = result.rawData;
  console.log(JSON.stringify(result.rawData));

  const getDirectionsUrl = (addr?: any) => {
    const region = addr.region ? ` ${addr.region}` : ``;
    const rawQuery = `${addr.line1},${addr.city},${region} ${addr.postalCode} ${addr.countryCode}`;
    const query = encodeURIComponent(rawQuery);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}&output=classic`;
    return url;
  };

  //Investment services - https://www.nicepng.com/png/detail/416-4162419_my-investment-comments-value-added-services-icon.png
  //Fin consultant - https://cdn-icons-png.flaticon.com/512/6684/6684013.png

  return (
    <div
      className="border rounded-sm bg-[#f9f7f6] p-4 flex gap-2 hover:border-[#d61f2b] items-center justify-between"
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
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 hover:underline hover:cursor-pointer items-center text-sm text-[#8982a7]">
          <FaArrowRight /> <div>contact</div>
        </div>
        <div className="flex gap-2 hover:underline hover:cursor-pointer items-center text-sm text-[#8982a7]">
          <FaArrowRight /> <div>contact</div>
        </div>
      </div>
      {/* <div className="flex flex-col ">
        <div className="flex w-full">
          <div className="flex flex-col justify-between gap-4 ">
            <a
              href={landingPageUrl}
              className="text-lg text-[#348daf] flex gap-4 items-center hover:underline"
            >
              {name}
            </a>
            <div className="flex items-center gap-2">
              <div>
                <BsClock />
              </div>
              <div>
                {hours ? (
                  <HoursText timezone={timezone} hours={hours} />
                ) : (
                  <>Fill in your hours</>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <CiPhone />
              </div>
              <div>
                {mainPhone &&
                  mainPhone
                    .replace("+1", "")
                    .replace(/\D+/g, "")
                    .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
              </div>
            </div>
            <div className="flex items-base gap-2">
              <div>
                <BsPin className="mt-2" />
              </div>
              <div className="flex flex-col text-gray-600 text-sm">
                <div>{address?.line1}</div>
                <div>
                  {address?.city}, {address?.region} {address?.postalCode}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-2">
          <div className="flex flex-col justify-between gap-4  ">
            <div>{description}</div>
            <div className="flex gap-4  items-center justify-between w-full">
              <div className="m-auto flex flex-col gap-6">
                <a
                  target="_blank"
                  href={`${getDirectionsUrl(address)}`}
                  className="w-52 uppercase bg-[#027da5] flex justify-center items-center gap-2  text-sm text-white hover:text-white border-2 border-[#027da5] hover:bg-[#027da5] hover:cursor-pointer font-bold text-center rounded-sm px-4 py-2"
                >
                  <LiaDirectionsSolid className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
              <div className="m-auto flex flex-col gap-6">
                <a
                  href={`/${slug}`}
                  className="w-52 mx-auto uppercase bg-[#027da5] flex justify-center items-center gap-2  text-sm text-white hover:text-white border-2 border-[#027da5] hover:bg-[#027da5] hover:cursor-pointer font-bold text-center rounded-sm px-4 py-2"
                >
                  <BsGlobe className="w-4 h-4" />
                  Visit page
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default LocationCard;
