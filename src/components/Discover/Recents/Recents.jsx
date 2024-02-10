/* eslint-disable react/prop-types */
import { nanoid } from "nanoid";

import Recent from "./Recent";

const Recents = ({ items }) => {
  return (
    <div className="grid grid-flow-col-dense grid-rows-2 gap-2 p-2 overflow-x-auto lg:grid-rows-3 lg:gap-4">
      {items?.items?.map((recent) => (
        <Recent key={nanoid()} items={recent} />
      ))}
    </div>
  );
};

export default Recents;
