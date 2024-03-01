import {
  Matcher,
  NumberRangeValue,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import classNames from "classnames";
import { getIconSwitch } from "./MapPin";

interface CustFacetProps {
  fieldId: string;
  displayName?: string;
}

const CustFacet = ({
  fieldId,
  displayName,
}: CustFacetProps): JSX.Element | null => {
  const searchActions = useSearchActions();
  const facet = useSearchState((state) =>
    state.filters.facets?.find((f) => f.fieldId === fieldId)
  );
  const handleFacetClick = (
    value: string | number | boolean | NumberRangeValue,
    selected: boolean,
    matcher = Matcher.Equals
  ) => {
    searchActions.resetFacets();
    searchActions.setFacetOption(fieldId, { matcher, value }, selected);
    searchActions.executeVerticalQuery();
    const queryParams = new URLSearchParams(window.location.search);
    if (value) {
      queryParams.set("type", value);
    } else {
      queryParams.delete("type");
    }
    history.pushState(null, "", "?" + queryParams.toString());
  };

  return facet && facet.options.length > 0 ? (
    <div className="my-4  flex mx-auto justify-center bg-[#f9f7f6]">
      {facet.options.map((o, i) => (
        <div
          key={`${fieldId}_${i}`}
          className={classNames(
            "mr-3 my-3 border border-toast-orange hover:cursor-pointer md:hover:bg-[#FFB563] w-40 py-4",
            {
              "bg-white": o.selected,
              "bg-[#f9f8f9]": !o.selected,
            }
          )}
          onClick={() => handleFacetClick(o.value, !o.selected)}
        >
          <div className="px-3 text-xs  text-center mx-auto flex flex-col items-center gap-4">
            {getIconSwitch(o.displayName, `h-12 w-12`)}

            <div className=" ">
              {o.displayName} {`(${o.count})`}
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export default CustFacet;
