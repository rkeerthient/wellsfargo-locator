import {
  Matcher,
  NumberRangeValue,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import {
  AppliedFilters,
  Coordinate,
  Facets,
  Geolocation,
  MapboxMap,
  OnDragHandler,
  Pagination,
  ResultsCount,
  SearchBar,
  VerticalResults,
  onSearchFunc,
} from "@yext/search-ui-react";
import { LngLat, LngLatBounds } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import CustFacet from "./CustFacet";
import Loader from "./Loader";
import LocationCard from "./LocationCard";
import MapPin from "./MapPin";
export interface Location {
  yextDisplayCoordinate?: Coordinate;
}

type verticalKey = {
  verticalKey: string;
};
const Locator = ({ verticalKey }: verticalKey) => {
  const searchActions = useSearchActions();
  const filters = useSearchState((state) => state.filters.static);
  const [isLoading, setIsLoading] = useState(true);
  const [showFacets, setShowFacets] = useState(false);
  const facets = useSearchState((state) => state.filters.facets);
  const facet = useSearchState((state) =>
    state.filters.facets?.find((f) => f.fieldId === "c_category")
  );
  const nr =
    facets &&
    facets
      .filter((item) => item.fieldId !== "c_category")
      .map((item) => item.options.length >= 1);

  useEffect(() => {
    searchActions.setVertical(verticalKey);
    let matcher = Matcher.Equals;
    const queryParams = new URLSearchParams(window.location.search);

    let q = queryParams.get("query");
    let value = queryParams.get("type");
    q && searchActions.setQuery(q);
    let fieldId = "c_category";
    let selected = true;
    searchActions
      .executeVerticalQuery()
      .then(() =>
        value
          ? (searchActions.setFacetOption(
              fieldId,
              { matcher, value },
              selected
            ),
            searchActions
              .executeVerticalQuery()
              .then(() => setIsLoading(false)))
          : setIsLoading(false)
      );
  }, [searchActions]);

  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    searchActions.executeVerticalQuery();
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.delete("type");
    if (query) {
      queryParams.set("query", query);
    } else {
      queryParams.delete("query");
    }
    history.pushState(null, "", "?" + queryParams.toString());
  };
  const onDrag: OnDragHandler = React.useCallback(
    (center: LngLat, bounds: LngLatBounds) => {
      const radius = center.distanceTo(bounds.getNorthEast());
      const nonLocationFilters: SelectableStaticFilter[] =
        filters?.filter(
          (f) =>
            f.filter.kind !== "fieldValue" ||
            f.filter.fieldId !== "builtin.location"
        ) ?? [];
      const nearFilter: SelectableStaticFilter = {
        selected: true,
        displayName: "Near Current Area",
        filter: {
          kind: "fieldValue",
          fieldId: "builtin.location",
          matcher: Matcher.Near,
          value: { ...center, radius },
        },
      };
      searchActions.setStaticFilters([...nonLocationFilters, nearFilter]);
      searchActions.executeVerticalQuery();
    },
    [filters, searchActions]
  );

  return (
    <>
      <SearchBar placeholder="Search here" onSearch={handleSearch} />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CustFacet fieldId="c_category" displayName="Category" />
          <div className="flex flex-row">
            <div
              className="flex flex-col w-2/5 p-4 overflow-scroll relative"
              style={{ height: "95vh" }}
            >
              <div
                className={`hover:cursor-pointer px-4 py-2 font-bold text-sm bg-[#d61f28] text-white w-fit ${nr && nr.every((v) => v === true) ? `block` : `hidden`}`}
                onClick={(e) => setShowFacets(!showFacets)}
              >
                Facets & Filters
              </div>

              {showFacets ? (
                <div className="absolute inset-0 bg-white h-[95vh]">
                  <IoIosClose
                    onClick={(e) => setShowFacets(false)}
                    className="ml-auto h-8 w-8 mr-4 hover:cursor-pointer hover:border"
                  />
                  <Facets
                    customCssClasses={{ facetsContainer: "mr-10" }}
                    searchOnChange={true}
                    excludedFieldIds={["c_category"]}
                  />
                  <div className="flex flex-row gap-4 mb-8">
                    <div
                      className="hover:cursor-pointer px-4 py-1 mt-4 bg-[#d61f28] font-bold text-white w-fit"
                      onClick={(e) => setShowFacets(!showFacets)}
                    >
                      Apply
                    </div>
                    <div
                      className="hover:cursor-pointer px-4 py-1 mt-4 text-[#027da5] w-fit hover:underline"
                      onClick={(e) => setShowFacets(false)}
                    >
                      Cancel
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <ResultsCount />
                    <AppliedFilters />
                    <VerticalResults
                      CardComponent={LocationCard}
                      customCssClasses={{
                        verticalResultsContainer:
                          "flex flex-col gap-4 bg-white",
                      }}
                    />
                    <div className="mt-4">
                      <Pagination />
                      <Geolocation
                        customCssClasses={{
                          iconContainer: "none",
                          geolocationContainer: "flex flex-col lg:flex-col",
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className=" w-3/5 h-screen">
              <MapboxMap
                mapboxOptions={{
                  zoom: 20,
                }}
                mapboxAccessToken={
                  import.meta.env.YEXT_PUBLIC_MAP_API_KEY || ""
                }
                PinComponent={(props) => <MapPin {...props} />}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Locator;

const createPopUp1 = (data: any) => {
  data = data;
  return `<div 
  > <h3 class="uppercase bembo text-sm font-normal mb-2.5">
  ${data.name}
</h3>
 
</div>`;
};
