/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const LikedItems = ({ items }) => {
  return (
    <div className="flex items-center justify-around lg:justify-start">
      <img
        loading="lazy"
        className="w-[10vw] lg:w-[8vw] aspect-square shadow-neo"
        src={items?.album?.images[1]?.url}
        alt={`${items?.album?.name} - album art`}
      />

      <div className="w-[65vw] pl-1 lg:pl-6">
        <h3 className="text-base font-bold text-blue-500 truncate lg:text-2xl">
          {items?.name}
        </h3>
        <div className="flex items-center gap-1">
          {items?.explicit ? (
            <span className="grid place-items-center rounded-[0.1rem] w-3 h-3 lg:w-4 lg:h-4 bg-gray text-[8px] lg:text-[10px] text-background">
              E
            </span>
          ) : (
            ""
          )}
          <h4 className="text-xs lg:text-base text-gray">
            {items?.artists[0]?.name}
          </h4>
        </div>
      </div>

      <div className="flex justify-end lg:justify-around items-center w-[15vw] lg:w-[5vw] lg:ml-auto">
        <div className="grid p-1 rounded-full cursor-pointer lg:p-2 place-items-center shadow-neo">
          <FontAwesomeIcon
            icon={icon({ name: "heart", style: "solid" })}
            className="text-text lg:text-xl"
          />
        </div>

        <FontAwesomeIcon
          icon={icon({ name: "ellipsis-vertical", style: "solid" })}
          className="ml-6 text-gray lg:text-2xl lg:ml-8"
        />
      </div>
    </div>
  );
};

export default LikedItems;
