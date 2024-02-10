/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Track = ({ items }) => {
  return (
    <Link
      to={`albumInfo/${items?.album?.id}`}
      className="flex flex-col items-start justify-start gap-2 lg:justify-center"
    >
      <div className="w-auto aspect-square h-[18vh] lg:h-[25vh] shadow-neoRaised p-2">
        {
          <img
            loading="lazy"
            className="w-full h-full"
            src={items?.album?.images[0]?.url}
            alt={`${items?.name} - artist image`}
          />
        }
      </div>
      <div className="w-32 lg:w-44">
        <h3 className="ml-2 text-sm font-semibold truncate lg:text-base text-gray max-h-10">
          {items?.name}
        </h3>
      </div>
    </Link>
  );
};

export default Track;
