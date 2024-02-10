/* eslint-disable react/prop-types */
import { nanoid } from "nanoid";

import FeaturedPlaylist from "./FeaturedPlaylist";

const FeaturedPlaylists = ({ title, items }) => {
  return (
    <div>
      <h2 className="px-2 py-1 text-xl font-extrabold text-text lg:py-4 lg:mt-6 lg:text-3xl">
        {title}
      </h2>
      <div className="flex gap-4 px-2 pb-3 pt-2 overflow-x-scroll min-h-[20vh] no-scrollbar lg:min-h-[30vh] lg:gap-6">
        {items?.playlists?.items?.map((item) => (
          <FeaturedPlaylist key={nanoid()} items={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPlaylists;
