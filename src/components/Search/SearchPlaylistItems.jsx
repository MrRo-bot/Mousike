/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const SearchPlaylistItems = ({ items }) => {
  return (
    <div className="relative flex items-center justify-start gap-4">
      <div className="w-auto rounded-lg aspect-square h-[10vh] lg:h-[20vh] shadow-neo p-1">
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
        <h3 className="text-lg lg:text-2xl font-bold truncate text-text">
          {items?.name}
        </h3>
        <h4 className="text-xs lg:text-base font-semibold capitalize truncate text-gray">
          {`${items?.owner?.display_name} • ${items?.type}`}
        </h4>
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

export default SearchPlaylistItems;
