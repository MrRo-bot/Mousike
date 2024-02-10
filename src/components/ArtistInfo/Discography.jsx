/* eslint-disable react/prop-types */
import { nanoid } from "nanoid";

import DiscographyItems from "./DiscographyItems";

const Discography = ({ items }) => {
  return (
    <div className="flex flex-col gap-4">
      {items?.items?.map((track) => track.album_type).includes("album") && (
        <h3 className="mb-2 text-lg font-bold lg:my-6 lg:text-3xl text-text">
          Albums
        </h3>
      )}
      {items?.items?.map(
        (track) =>
          track.album_type === "album" && (
            <DiscographyItems key={nanoid()} items={track} />
          )
      )}
      {items?.items?.map((track) => track.album_type).includes("single") && (
        <h3 className="mb-2 text-lg font-bold lg:my-6 lg:text-3xl text-text">
          Singles
        </h3>
      )}
      {items?.items?.map(
        (track) =>
          track.album_type === "single" && (
            <DiscographyItems key={nanoid()} items={track} />
          )
      )}
      {items?.items
        ?.map((track) => track.album_type)
        .includes("compilation") && (
        <h3 className="mb-2 text-lg font-bold lg:my-6 lg:text-3xl text-text">
          Compilations
        </h3>
      )}
      {items?.items?.map(
        (track) =>
          track.album_type === "compilation" && (
            <DiscographyItems key={nanoid()} items={track} />
          )
      )}
      {items?.items
        ?.map((track) => track.album_type)
        .includes("appears_on") && (
        <h3 className="mb-2 text-lg font-bold lg:my-6 lg:text-3xl text-text">
          Appears on
        </h3>
      )}
      {items?.items?.map(
        (track) =>
          track.album_type === "appears_on" && (
            <DiscographyItems key={nanoid()} items={track} />
          )
      )}
    </div>
  );
};

export default Discography;
