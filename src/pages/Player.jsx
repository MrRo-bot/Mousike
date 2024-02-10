/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { Link } from "react-router-dom";

import { useDataContextValue } from "../Context/ProfileContext";

import { randNum } from "../utils/Math";

import { useAnimate } from "framer-motion";

const Player = () => {
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

  const [{ item }] = useDataContextValue();

  return (
    <div className="flex flex-col w-screen h-screen gap-5 px-4 lg:px-10 lg:py-2">
      <header className="flex justify-between items-center h-[8vh]">
        <Link
          to="/"
          className="grid w-8 h-8 rounded-full cursor-pointer place-items-center shadow-neo active:shadow-neoInset"
        >
          <FontAwesomeIcon
            icon={icon({ name: "chevron-left", style: "solid" })}
            className="text-text"
          />
        </Link>
        <div>
          <h3 className="text-xs text-center lg:text-base text-gray">{`PLAYING FROM ${item?.item?.type?.toUpperCase()}`}</h3>
          <h3 className="mt-1 text-xs font-bold text-center lg:text-base text-gray">
            {item?.item?.album?.name}
          </h3>
        </div>
        <div className="grid w-8 h-8 rounded-full cursor-pointer place-items-center shadow-neo active:shadow-neoInset">
          <FontAwesomeIcon
            icon={icon({ name: "ellipsis-vertical", style: "solid" })}
            className="cursor-pointer text-gray active:scale-125"
          />
        </div>
      </header>

      <div className="flex flex-col px-10 pb-2 pt-14 lg:flex-row lg:p-4 lg:justify-around">
        <div className="p-2 mx-auto lg:m-0 rounded-full max-w-[25em] lg:max-w-[35em] shadow-neo">
          <div className="w-full h-full p-4 overflow-hidden rounded-full shadow-neoInset animate-spin-slow">
            {item?.item?.album?.images[0]?.url ? (
              <img
                loading="lazy"
                className="rounded-full"
                src={item?.item?.album?.images[0]?.url}
                alt={`${item?.item?.name} album art`}
              />
            ) : (
              <div className="rounded-full">
                <img src="/src/assets/logo.png" alt="logo" />
              </div>
            )}
          </div>
        </div>
        <div className="lg:flex lg:flex-col lg:w-[40vw] lg:justify-center">
          <div className="flex items-center justify-between mt-10 lg:mt-0 lg:mb-2">
            <div className="flex flex-col w-[90%]">
              <h1 className="font-bold truncate lg:text-4xl text-text">
                {item?.item?.name}
              </h1>
              <h2 className="text-sm font-medium lg:text-xl text-gray">
                {item?.item?.artists?.map((artist) => artist.name).join(", ")}
              </h2>
            </div>
            <div
              ref={scope}
              onClick={onHeartClick}
              className="relative grid w-8 h-8 rounded-full cursor-pointer lg:w-11 lg:h-11 place-items-center shadow-neo active:shadow-neoInset"
            >
              <FontAwesomeIcon
                icon={icon({ name: "heart", style: "solid" })}
                className="heartIcon text-gray transform-gpu lg:text-xl"
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
          </div>

          <input
            type="range"
            max={100}
            min={0}
            step={0}
            // value={range(item?.progress_ms, item?.item?.duration_ms)}
            className="range"
          />

          <div className="flex items-center justify-between mt-4 mb-6 lg:mt-20">
            <div className="grid w-8 h-8 rounded-full cursor-pointer lg:w-10 lg:h-10 place-items-center shadow-neo active:shadow-neoInset">
              <FontAwesomeIcon
                icon={icon({ name: "shuffle", style: "solid" })}
                className="text-gray lg:text-2xl"
                size="xs"
              />
            </div>
            <div className="grid w-10 h-10 rounded-full cursor-pointer lg:w-12 lg:h-12 place-items-center shadow-neo active:shadow-neoInset">
              <FontAwesomeIcon
                icon={icon({ name: "backward-step", style: "solid" })}
                className="text-gray lg:text-2xl"
                size="sm"
              />
            </div>
            <div className="grid w-12 h-12 rounded-full cursor-pointer lg:w-14 lg:h-14 place-items-center shadow-neo active:shadow-neoInset">
              <FontAwesomeIcon
                icon={icon({ name: "play", style: "solid" })}
                className="text-gray lg:text-2xl"
                size="lg"
              />
            </div>
            <div className="grid w-10 h-10 rounded-full cursor-pointer lg:w-12 lg:h-12 place-items-center shadow-neo active:shadow-neoInset">
              <FontAwesomeIcon
                icon={icon({ name: "forward-step", style: "solid" })}
                className="text-gray lg:text-2xl"
                size="sm"
              />
            </div>
            <div className="grid w-8 h-8 rounded-full cursor-pointer lg:w-10 lg:h-10 place-items-center shadow-neo active:shadow-neoInset">
              <FontAwesomeIcon
                icon={icon({ name: "repeat", style: "solid" })}
                className="text-gray lg:text-2xl"
                size="xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="grid w-10 h-10 rounded-full cursor-pointer lg:h-11 lg:w-11 place-items-center shadow-neo active:shadow-neoInset">
              <FontAwesomeIcon
                icon={icon({ name: "microphone", style: "solid" })}
                className="text-xl text-gray"
                size="lg"
              />
            </div>
            <div className="grid w-10 h-10 rounded-full cursor-pointer lg:h-11 lg:w-11 place-items-center shadow-neo active:shadow-neoInset">
              <FontAwesomeIcon
                icon={icon({ name: "rectangle-list", style: "solid" })}
                className="text-xl text-gray"
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
      <footer></footer>
    </div>
  );
};

export default Player;
