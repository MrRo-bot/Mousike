/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { playbackTimeSimple } from "../../utils/Math";

const AlbumItems = ({ items, windowWidth }) => {
  return (
    <div className="flex items-center justify-between lg:justify-evenly">
      {windowWidth >= 1024 ? (
        <div>
          <h2 className="text-gray">{items?.track_number}</h2>
        </div>
      ) : (
        ""
      )}
      <div className="w-10/12">
        <h2 className="text-base font-semibold truncate lg:text-xl lg:mb-2 text-text">
          {items?.name}
        </h2>
        <div className="flex items-center gap-1">
          {items?.explicit ? (
            <span className="grid place-items-center rounded-[0.1rem] w-3 h-3 lg:w-4 lg:h-4 bg-gray text-[8px] lg:text-[10px] text-background">
              E
            </span>
          ) : (
            ""
          )}
          <h3 className="text-sm font-medium truncate lg:text-base text-gray">
            {items?.artists
              .reduce((list, artist) => [...list, artist?.name], [])
              .join(", ") || ""}
          </h3>
        </div>
      </div>
      {windowWidth >= 1024 ? (
        <div className="ml-0">
          <h2 className="text-gray">
            {playbackTimeSimple(items?.duration_ms)}
          </h2>
        </div>
      ) : (
        ""
      )}
      <div className="w-1/12">
        <FontAwesomeIcon
          icon={icon({ name: "ellipsis-vertical", style: "solid" })}
          className="block mx-auto cursor-pointer lg:ml-auto lg:mr-4 text-gray active:scale-125"
        />
      </div>
    </div>
  );
};

export default AlbumItems;
