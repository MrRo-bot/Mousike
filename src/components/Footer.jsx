/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { NavLink } from "react-router-dom";

import PlayerMini from "./PlayerMini";

const Footer = ({ spotify }) => {
  return (
    <div className="sticky bottom-0 z-50 flex flex-col items-center justify-center w-full">
      <PlayerMini spotify={spotify} />

      <div className="flex justify-around w-full py-1 lg:justify-center lg:gap-48 bg-background">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-text" : "text-gray")}
        >
          <div className="grid w-10 h-10 rounded-md cursor-pointer active:shadow-neoInset place-items-center shadow-neo">
            <FontAwesomeIcon
              icon={icon({ name: "home", style: "solid" })}
              size="lg"
            />
          </div>
        </NavLink>
        <NavLink
          to="search"
          className={({ isActive }) => (isActive ? "text-text" : "text-gray")}
        >
          <div className="grid w-10 h-10 rounded-md cursor-pointer active:shadow-neoInset place-items-center shadow-neo">
            <FontAwesomeIcon
              icon={icon({ name: "search", style: "solid" })}
              size="lg"
            />
          </div>
        </NavLink>
        <NavLink
          to="library"
          className={({ isActive }) => (isActive ? "text-text" : "text-gray")}
        >
          <div className="grid w-10 h-10 rounded-md cursor-pointer active:shadow-neoInset place-items-center shadow-neo">
            <FontAwesomeIcon
              icon={icon({ name: "list", style: "solid" })}
              size="lg"
            />
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Footer;
