/* eslint-disable react/prop-types */
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { Greetings } from "../../utils/Math";

const Header = ({ items }) => {
  return (
    <div className="flex gap-2 px-2 py-5">
      <div className="grid w-8 h-8 rounded-full lg:h-10 lg:w-10">
        <img
          loading="lazy"
          className="w-full h-full rounded-full"
          src={items?.images[0]?.url}
          alt={`${items?.display_name} profile picture`}
        />
      </div>
      <h1 className="text-2xl font-extrabold lg:text-4xl headingGradient">
        {Greetings()}
      </h1>
      {/* 
      <div className="grid w-8 h-8 p-2 ml-auto rounded-full cursor-pointer place-items-center">
        <FontAwesomeIcon
          icon={icon({ name: "clock-rotate-left", style: "solid" })}
          className="rounded-full text-gray active:text-text"
        />
      </div> */}
    </div>
  );
};

export default Header;
