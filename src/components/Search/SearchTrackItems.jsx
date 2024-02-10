/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const SearchTrackItems = ({ items }) => {
  return (
    <div className="relative flex items-center justify-start gap-4">
      <div className="w-auto rounded aspect-square h-[10vh] lg:h-[20vh] shadow-neo p-1">
        <img
          loading="lazy"
          className="w-full h-full rounded"
          src={items?.album?.images[1]?.url}
          alt={`${items?.album?.name} - album art`}
        />
      </div>

      <div className="w-[60vw]">
        <h3 className="text-lg font-bold truncate lg:text-2xl text-text">
          {items?.name}
        </h3>
        <div className="flex items-center gap-1">
          {items?.explicit ? (
            <span className="grid place-items-center rounded-[0.1rem] w-3 h-3 bg-gray text-[8px] text-background">
              E
            </span>
          ) : (
            ""
          )}
          <h4 className="text-xs font-semibold capitalize truncate lg:text-base text-gray">
            {items?.artists[0]?.name}
          </h4>
        </div>
      </div>

      <div className="ml-auto mr-2">
        <FontAwesomeIcon
          icon={icon({ name: "ellipsis-vertical", style: "solid" })}
          className="text-gray"
        />
      </div>
    </div>
  );
};

export default SearchTrackItems;
