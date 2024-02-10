/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Recent = ({ items }) => {
  return (
    <Link
      to={`albumInfo/${items?.track?.album?.id}`}
      className="w-[40vw] flex gap-1 h-[6vh] lg:w-[30vw] lg:h-[10vh] overflow-hidden justify-start items-center rounded-md shadow-neo"
    >
      {
        <img
          loading="lazy"
          className="w-12 lg:w-20"
          src={items?.track?.album?.images[2]?.url}
          alt={`${items?.track?.name} - artwork`}
        />
      }
      <span className="w-[70%] lg:w-[90%] text-xs lg:text-base font-bold text-blue-500 truncate">
        {items?.track?.name}
      </span>
    </Link>
  );
};

export default Recent;
