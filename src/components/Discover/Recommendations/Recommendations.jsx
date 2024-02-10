/* eslint-disable react/prop-types */
import { nanoid } from "nanoid";

import Recommendation from "./Recommendation";

const Recommendations = ({ title, items }) => {
  return (
    <div>
      <h2 className="px-2 py-1 text-xl font-extrabold lg:py-4 lg:mt-6 lg:text-3xl text-text">
        {title}
      </h2>
      <div className="flex gap-4 lg:gap-6 px-2 pb-3 pt-2 overflow-x-scroll min-h-[20vh] no-scrollbar lg:min-h-[30vh]">
        {items?.tracks?.map((recommendedTracks) => (
          <Recommendation key={nanoid()} items={recommendedTracks} />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
