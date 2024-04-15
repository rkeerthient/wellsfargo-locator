import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Image } from "@yext/pages-components";
import { FaRegUser } from "react-icons/fa6";
import { HiArrowSmallRight } from "react-icons/hi2";
const Professional = ({ result }: any) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="px-4 text-sm flex w-full justify-between py-2 items-center rounded-lg ">
            <div className="flex  gap-2 items-center">
              <FaRegUser />
              <div>
                {result.length} Consultant{result.length >= 2 && `s`}
              </div>
            </div>
            <ChevronDownIcon
              className={`${
                open ? "rotate-180 transform" : ""
              } h-4 w-4 text-[#d71e2b]`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className=" pb-2 text-sm text-gray-800 border-b border-neutral-light">
            <div className="flex flex-col gap-2 items-center">
              {result.map((item: any, index: any) => {
                const {
                  c_hMCFullName,
                  emails,
                  c_primaryTitle,
                  mainPhone,
                  c_pagesURL,
                  c_profileImage,
                } = item;
                return (
                  <div
                    className="hover:border-l-2 border-l-2  border-l-transparent hover:border-t-neutral-light hover:border-[#d71e2b] flex px-4 justify-between w-full py-4 border-t border-neutral-light "
                    key={index}
                  >
                    <div className={`flex w-3/4 gap-2  items-center `}>
                      <div>
                        {c_profileImage && (
                          <Image image={c_profileImage} className="h-20" />
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <a
                          href={c_pagesURL}
                          target="_blank"
                          className="text-[#352b6b] flex items-center  font-medium hover:underline"
                        >
                          {c_hMCFullName}{" "}
                          <ChevronRightIcon className=" h-4 w-4" />
                        </a>
                        <div>{c_primaryTitle}</div>
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
                    <div className="flex flex-col gap-2 m-auto">
                      <div>
                        <a
                          className="hover:underline text-[#352b6b] flex items-center gap-2"
                          href={`emailto:${emails[0]}`}
                        >
                          <HiArrowSmallRight className="h-4 w-4 text-gray-400" />
                          Request Email
                        </a>
                      </div>
                      <div>
                        <a
                          className="hover:underline text-[#352b6b] flex items-center gap-2"
                          href={c_pagesURL}
                        >
                          <HiArrowSmallRight className="h-4 w-4 text-gray-400" />
                          Visit my page
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Professional;
