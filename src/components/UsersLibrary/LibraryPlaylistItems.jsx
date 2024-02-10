import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
// import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const LibraryItems = ({ items }) => {
  return (
    <div className="relative flex items-center justify-start gap-4">
      <div className="w-auto rounded-lg lg:rounded-2xl aspect-square h-[10vh] lg:h-[20vh] shadow-neo p-1 lg:p-2">
        {
          <img
            loading="lazy"
            className="w-full h-full rounded-lg"
            src={items?.images[0]?.url}
            alt={`${items?.name} - album art`}
          />
        }
      </div>
      <div className="w-[60vw]">
        <h3 className="text-lg font-bold truncate lg:text-2xl text-text">
          {items?.name}
        </h3>
        <h4 className="text-xs font-semibold capitalize truncate lg:text-base text-gray">
          {`${items?.owner?.display_name} • ${items?.type}`}
        </h4>
      </div>
      <div className="ml-auto mr-2">
        <FontAwesomeIcon
          icon={icon({ name: "ellipsis-vertical", style: "solid" })}
          className="text-gray lg:text-xl"
        />
      </div>
    </div>
  );
};

export default LibraryItems;
