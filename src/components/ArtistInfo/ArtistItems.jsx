import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { playbackTimeSimple } from "../../utils/Math";

/* eslint-disable react/prop-types */
const ArtistItems = ({ items, windowWidth }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between lg:justify-start">
        <div className="flex items-center justify-between gap-2 lg:gap-4">
          <div className="w-20 p-1 rounded-sm lg:w-24 shadow-neo">
            <img
              loading="lazy"
              className="w-full"
              src={items?.album?.images[1]?.url}
              alt={`${items?.album?.name} - artist profile`}
            />
          </div>
          <div className="w-[65vw]">
            <h3 className="font-bold truncate lg:text-xl lg:mb-2 text-text">
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
              <h4 className="inline text-sm font-medium capitalize truncate lg:text-base text-gray">{`${items?.album?.name} • ${items?.album?.album_type}`}</h4>
            </div>
          </div>
        </div>
        {windowWidth >= 1024 ? (
          <div className="ml-[17%]">
            <h2 className="text-gray">
              {playbackTimeSimple(items?.duration_ms)}
            </h2>
          </div>
        ) : (
          ""
        )}

        <div className="grid p-1.5 place-items-center ml-auto">
          <FontAwesomeIcon
            icon={icon({ name: "ellipsis-vertical", type: "solid" })}
            className="text-xs cursor-pointer lg:text-base text-gray active:scale-125"
          />
        </div>
      </div>
    </div>
  );
};

export default ArtistItems;
