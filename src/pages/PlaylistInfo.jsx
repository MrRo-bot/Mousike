/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { Link, useParams } from "react-router-dom";

import { nanoid } from "nanoid";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useAnimate, motion, useScroll, useTransform } from "framer-motion";

import PlaylistItems from "../components/PlaylistInfo/PlaylistItems";

import { playbackTime, randNum } from "../utils/Math";
import { NumericFormat } from "react-number-format";

const PlaylistInfo = ({ spotify }) => {
  const [scope, animate] = useAnimate();

  const playlistData = useParams();

  const [playlist, setPlaylist] = useState(null);

  const [load, setLoad] = useState(true);

  const playlistRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: playlistRef,
    offset: ["0, 1", "0, 0"],
  });

  const opacityProgress = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  const scaleProgress = useTransform(scrollYProgress, [0.58, 1], [1, 0]);

  const colorProgress = useTransform(
    scrollYProgress,
    [0.9, 1],
    ["hsla(206, 19%, 93%, 0)", "hsla(206, 19%, 93%, 1)"]
  );

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  });

  useEffect(() => {
    spotify
      .getPlaylist(playlistData?.playlistId)
      .then((playlist) => setPlaylist(playlist));
  }, [playlistData, spotify]);

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

  return (
    <SkeletonTheme
      baseColor="var(--skeletonBack)"
      highlightColor="var(--skeletonShine)"
      borderRadius={2}
    >
      <motion.div
        style={{
          backgroundColor: colorProgress,
        }}
        className="z-[1000] fixed top-0 flex items-center justify-start gap-2 py-2 px-4 lg:px-8 w-full"
      >
        <Link to="/">
          <FontAwesomeIcon
            icon={icon({ name: "arrow-left-long", style: "solid" })}
            className="p-1 text-xl rounded-full text-text shadow-neo bg-background active:shadow-neoInset lg:p-2 lg:text-2xl"
          />
        </Link>

        <motion.h2
          style={{ opacity: opacityProgress }}
          className="text-xl font-extrabold truncate text-text lg:pl-4"
        >
          {playlist?.name}
        </motion.h2>
        <motion.div
          style={{ opacity: opacityProgress }}
          className="grid w-10 h-10 ml-auto rounded-full cursor-pointer place-items-center bg-background shadow-neoRaised active:shadow-none"
        >
          <FontAwesomeIcon
            icon={icon({ name: "play", style: "solid" })}
            className="text-text"
          />
        </motion.div>
      </motion.div>
      <div className="px-4 mt-14 lg:px-8">
        {/* <div className="flex h-full gap-2 px-2 py-2">
          <input
            autoFocus
            className="pl-8 shadow-neo bg-[url('assets/search.png')] bg-no-repeat bg-[length:1.2em] bg-[0.5em_center] bg-origin-padding w-full bg-background/50 h-8 rounded-md"
            type="text"
            name="search"
            id="search"
            //   value={something}
            placeholder="Find in playlist"
            onChange={() => {}}
          />
          <div className="grid px-4 font-bold rounded-md place-items-center text-text shadow-neoRaised">
            Sort
          </div>
        </div> */}
        <header className="my-4">
          <motion.div
            style={{ scale: scaleProgress }}
            className="p-3 mx-auto mb-4 origin-bottom max-w-80 max-h-80 lg:max-h-[52vh] aspect-square shadow-neoRaised"
          >
            {load ? (
              <img src="../src/assets/logo.png" alt="logo" />
            ) : (
              <img
                loading="lazy"
                className="w-full h-full"
                src={playlist?.images[0]?.url}
                alt={`${playlist?.name} - playlist art`}
              />
            )}
          </motion.div>
        </header>
        <div ref={playlistRef}>
          <h1 className="mb-2 truncate lg:text-xl text-gray">
            {load ? <Skeleton /> : playlist?.description}
          </h1>
          <div className="flex items-center gap-1 mb-2 lg:my-4 lg:gap-3">
            {load ? (
              <Skeleton className="!w-[30vw]" />
            ) : (
              <>
                <img
                  loading="lazy"
                  className="w-6 h-6 rounded-full lg:w-10 lg:h-10"
                  src="../src/assets/spotify_green.png"
                  alt="spotify - artist art"
                />
                <h2 className="text-sm font-extrabold lg:text-xl text-text">
                  {playlist?.owner?.display_name}
                </h2>
              </>
            )}
          </div>
          <div className="flex gap-1">
            {load ? (
              <Skeleton className="!w-[50vw]" />
            ) : (
              <>
                <h3 className="text-xs font-semibold lg:text-lg text-gray">
                  <NumericFormat
                    displayType="text"
                    thousandSeparator=","
                    thousandsGroupStyle="thousand"
                    value={playlist?.followers?.total}
                  />{" "}
                  Likes
                </h3>
                <h3 className="text-xs font-semibold lg:text-lg text-gray">
                  •
                </h3>
                <h3 className="text-xs font-semibold lg:text-lg text-gray">
                  {playlist &&
                    playbackTime(
                      playlist?.tracks?.items?.map(
                        (track) => track?.track?.duration_ms
                      )
                    ).slice(11)}
                </h3>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between my-2 lg:my-6">
          <div className="flex items-center gap-5 lg:gap-8">
            <div
              ref={scope}
              onClick={onHeartClick}
              className="relative grid w-8 h-8 rounded-full cursor-pointer lg:w-12 lg:h-12 shadow-neo active:shadow-none focus:shadow-none place-items-center"
            >
              <FontAwesomeIcon
                icon={icon({ name: "heart", style: "solid" })}
                className="heartIcon lg:text-2xl text-gray transform-gpu"
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
            <FontAwesomeIcon
              icon={icon({ name: "ellipsis-vertical", style: "solid" })}
              className="cursor-pointer lg:text-2xl text-gray active:scale-125"
            />
          </div>
          <div className="flex items-center gap-5 lg:gap-8">
            <FontAwesomeIcon
              icon={icon({ name: "shuffle", style: "solid" })}
              className="cursor-pointer lg:text-2xl text-gray active:scale-125"
            />
            <div className="grid w-10 h-10 rounded-full cursor-pointer lg:w-14 lg:h-14 place-items-center bg-background shadow-neoRaised active:shadow-none">
              <FontAwesomeIcon
                icon={icon({ name: "play", style: "solid" })}
                className="text-text lg:text-2xl"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-8 mb-2">
          {load ? (
            <div className="flex gap-2">
              <Skeleton className="!w-10 !h-10" />
              <div className="w-full">
                <Skeleton className="!w-1/2" />
                <Skeleton className="!w-1/3" />
              </div>
            </div>
          ) : (
            playlist?.tracks?.items?.map((track) => (
              <PlaylistItems key={nanoid()} items={track} />
            ))
          )}
        </div>
        <footer className=""></footer>
      </div>
    </SkeletonTheme>
  );
};

export default PlaylistInfo;
