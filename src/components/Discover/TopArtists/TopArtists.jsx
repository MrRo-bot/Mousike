/* eslint-disable react/prop-types */
import { nanoid } from "nanoid";

import Artist from "./Artist";

const TopArtists = ({ title, items }) => {
  return (
    <div>
      <h2 className="px-2 py-1 text-xl font-extrabold lg:py-4 lg:mt-6 lg:text-3xl text-text">
        {title}
      </h2>
      <div className="flex gap-4 px-2 pb-3 pt-2 overflow-x-scroll min-h-[20vh] lg:min-h-[30vh] lg:gap-6  no-scrollbar">
        {items?.items?.map((item) => (
          <Artist key={nanoid()} items={item} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
