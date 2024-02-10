/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const Artist = ({ items }) => {
  return (
    <Link
      to={`artistInfo/${items?.id}`}
      className="flex flex-col items-start justify-start gap-2 lg:justify-center"
    >
      <div className="w-auto aspect-square h-[20vh] lg:h-[25vh] p-2 rounded-full shadow-neoRaised">
        {
          <img
            loading="lazy"
            className="w-full h-full rounded-full"
            src={items?.images[1]?.url}
            alt={`${items?.name} - artist image`}
          />
        }
      </div>
      <div className="mx-auto max-w-[30vw]">
        <h3 className="text-sm font-semibold truncate lg:text-base text-gray max-h-10">
          {items?.name}
        </h3>
      </div>
    </Link>
  );
};

export default Artist;
