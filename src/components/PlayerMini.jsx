/* eslint-disable react/prop-types */
import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { Link } from "react-router-dom";

import { useDataContextValue } from "../Context/ProfileContext";
import { useAnimate } from "framer-motion";

import { randNum } from "../utils/Math";

const PlayerMini = ({ spotify }) => {
  const [scope, animate] = useAnimate();

  const onHeartClick = () => {
    const hearts = Array.from({ length: 7 });

    const heartsAnimation = hearts.map((_, index) => [
      `.heart-${index}`,
      {
        x: randNum(-10, 10),
        y: randNum(-10, -50),
        scale: 1,
        opacity: 1,
      },
      {
        duration: 0.4,
        at: "<",
      },
    ]);

    const heartsFadeOut = hearts.map((_, index) => [
      `.heart-${index}`,
      { opacity: 0 },
      {
        duration: 0.3,
        at: "<",
      },
    ]);

    const heartsReset = hearts.map((_, index) => [
      `.heart-${index}`,
      { x: 0, y: 0 },
      { duration: 0.00001 },
    ]);

    animate([
      ...heartsReset,
      [".heartIcon", { color: "hsl(180, 63%, 41%)" }],
      ...heartsAnimation,
      [".heartIcon", { color: "hsl(218, 11%, 65%)" }],
      ...heartsFadeOut,
    ]);
  };
  const [{ item }, dispatch] = useDataContextValue();

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((playback) => {
      dispatch({
        type: "SET_PLAYING",
        playing: playback.is_playing,
      });
      dispatch({
        type: "SET_ITEM",
        item: playback,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotify]);

  return (
    <div className="w-[95%] lg:w-[65%] p-2 my-1 rounded-md shadow-neo bg-background">
      <div className="flex items-center justify-between">
        <Link to="player" className="flex gap-2 lg:gap-4">
          {item?.item?.album?.images[0]?.url ? (
            <img
              loading="lazy"
              className="rounded-md w-9 lg:w-14 shadow-neo"
              src={item?.item?.album?.images[0]?.url}
              alt={`${item?.item?.name} album art`}
            />
          ) : (
            <div className="rounded-md w-9 h-9 shadow-neo"></div>
          )}
          <div className="flex flex-col w-[60vw] lg:w-[40vw]">
            <h1 className="font-bold truncate lg:text-2xl text-text">
              {item?.item?.name}
            </h1>
            <h2 className="text-xs font-medium truncate lg:text-base text-gray">
              {item?.item?.artists?.map((artist) => artist.name).join(", ")}
            </h2>
          </div>
        </Link>
        <div className="flex gap-4">
          <div
            ref={scope}
            onClick={onHeartClick}
            className="relative grid rounded-full cursor-pointer w-9 h-9 lg:w-11 lg:h-11 place-items-center shadow-neo outline-1 outline-text outline active:shadow-neoInset active:outline-none"
          >
            <FontAwesomeIcon
              icon={icon({ name: "heart", style: "solid" })}
              className="lg:text-xl heartIcon text-gray transform-gpu"
            />
            {Array.from({ length: 7 }).map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={icon({ name: "heart", style: "solid" })}
                size="xs"
                className={`heart-${index} text-text absolute opacity-0 pointer-events-none transform-gpu`}
              />
            ))}
          </div>

          <div className="grid rounded-full cursor-pointer w-9 h-9 lg:w-11 lg:h-11 place-items-center shadow-neoRaised active:shadow-neoInset">
            <FontAwesomeIcon
              icon={icon({ name: "play", style: "solid" })}
              className="text-text lg:text-xl"
            />
          </div>
        </div>
      </div>

      <input
        type="range"
        max={100}
        min={0}
        step={0}
        // value={range(item?.progress_ms, item?.item?.duration_ms)}
        className="range !mb-0"
      />
    </div>
  );
};

export default PlayerMini;
