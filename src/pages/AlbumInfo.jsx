/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { Link, useParams } from "react-router-dom";

import { nanoid } from "nanoid";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useAnimate, motion, useScroll, useTransform } from "framer-motion";

import AlbumItems from "../components/AlbumInfo/AlbumItems";

import { timeAndDate, playbackTime, randNum } from "../utils/Math";

const AlbumInfo = ({ spotify }) => {
  const [scope, animate] = useAnimate();

  const albumData = useParams();

  const [album, setAlbum] = useState(null);

  const [artist, setArtist] = useState(null);

  const [load, setLoad] = useState(true);

  const albumArtRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: albumArtRef,
    offset: ["1, 0", "-4, 0"],
  });

  const scaleProgress = useTransform(scrollYProgress, [1, 0.2], [1, 0]);

  const opacityProgress = useTransform(
    scrollYProgress,
    [1, 0.2, 0],
    [0, 0.05, 1]
  );

  const colorProgress = useTransform(
    scrollYProgress,
    [1, 0.2, 0],
    [
      "hsla(206, 19%, 93%, 0)",
      "hsla(206, 19%, 93%, 0)",
      "hsla(206, 19%, 93%, 1)",
      // "hsla(0, 0%, 90%, 1)",
    ]
  );

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  });

  useEffect(() => {
    spotify
      .getAlbum(albumData?.albumId)
      .then((albumDetail) => setAlbum(albumDetail));
  }, [albumData, spotify]);

  useEffect(() => {
    spotify
      .getArtist(album && album?.artists[0]?.id)
      .then((artistDetail) => setArtist(artistDetail));
  }, [album, spotify]);

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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWidthChange = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleWidthChange);

    return () => {
      window.removeEventListener("resize", handleWidthChange);
    };
  }, []);

  return (
    <SkeletonTheme
      baseColor="var(--skeletonBack)"
      highlightColor="var(--skeletonShine)"
      borderRadius={2}
    >
      <div className="px-4 lg:px-8">
        <header className="sticky top-0 my-4">
          <motion.div
            style={{
              backgroundColor: colorProgress,
            }}
            className="absolute flex items-center justify-start w-full gap-2 py-1 lg:p-2"
          >
            <Link to="/">
              <FontAwesomeIcon
                icon={icon({ name: "arrow-left-long", style: "solid" })}
                className="p-1 text-xl rounded-full lg:text-2xl lg:p-2 bg-background text-text shadow-neo active:shadow-neoInset"
              />
            </Link>

            <motion.h2
              style={{ opacity: opacityProgress }}
              className="text-xl lg:pl-4 font-extrabold truncate max-w-[70vw] text-text"
            >
              {album?.name}
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

          <motion.div
            style={{ scale: scaleProgress }}
            className="p-3 mx-auto origin-top aspect-square max-h-80 max-w-80 shadow-neoRaised lg:max-h-[52vh]"
          >
            {load ? (
              <img src="../src/assets/logo.png" alt="logo" />
            ) : (
              <img
                loading="lazy"
                className="w-full h-full"
                src={album?.images[1]?.url}
                alt={`${album?.name} - album art`}
              />
            )}
          </motion.div>
        </header>

        <div ref={albumArtRef}>
          <h1 className="pb-2 text-2xl font-extrabold truncate lg:text-4xl text-text">
            {load ? <Skeleton className="!w-1/2" /> : album?.name}
          </h1>
          <div className="flex items-center gap-1 mb-2 lg:gap-3">
            {load ? (
              <img
                className="w-4 h-4 rounded-full"
                src="../src/assets/logo.png"
                alt="logo"
              />
            ) : (
              <img
                loading="lazy"
                className="w-4 h-4 rounded-full lg:h-8 lg:w-8 shadow-neo"
                src={artist?.images[0]?.url}
                alt={`${artist?.name} - artist profile`}
              />
            )}
            <h2 className="text-xs font-extrabold lg:text-lg text-text">
              {load ? <Skeleton className="!w-10" /> : artist?.name}
            </h2>
          </div>
          <div className="flex gap-1 text-xs font-semibold capitalize lg:text-base text-gray">
            <h3>{load ? <Skeleton className="!w-4" /> : album?.type}</h3>
            <span>•</span>
            <h3>
              {load ? (
                <Skeleton className="!w-6" />
              ) : (
                album?.release_date?.slice(0, 4)
              )}
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-between my-2 lg:my-8">
          <div className="flex items-center gap-5 lg:gap-8">
            <div
              ref={scope}
              onClick={onHeartClick}
              className="relative grid w-8 h-8 rounded-full cursor-pointer lg:w-11 lg:h-11 shadow-neo active:shadow-none focus:shadow-none place-items-center"
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
            <FontAwesomeIcon
              icon={icon({ name: "ellipsis-vertical", style: "solid" })}
              className="cursor-pointer lg:text-xl text-gray active:scale-125"
            />
          </div>
          <div className="flex items-center gap-5 lg:gap-8">
            <FontAwesomeIcon
              icon={icon({ name: "shuffle", style: "solid" })}
              className="cursor-pointer lg:text-xl text-gray active:scale-125"
            />
            <div className="grid w-10 h-10 rounded-full cursor-pointer lg:w-11 lg:h-11 place-items-center bg-background shadow-neoRaised active:shadow-none">
              <FontAwesomeIcon
                icon={icon({ name: "play", style: "solid" })}
                className="text-text lg:text-xl"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-4 lg:gap-6">
          {windowWidth >= 1024 ? (
            <div className="flex justify-start text-gray">
              <div className="w-[2.8%] text-center text-lg">#</div>
              <div className="w-[83.3%] text-lg">Title</div>
              <div className="pl-5 text-xl">🕐</div>
            </div>
          ) : (
            ""
          )}
          {load ? (
            <>
              <Skeleton count={2} className="!w-1/3" />
            </>
          ) : (
            album?.tracks?.items?.map((track) => (
              <AlbumItems
                key={nanoid()}
                items={track}
                windowWidth={windowWidth}
              />
            ))
          )}
        </div>

        <div className="mb-4 lg:my-8">
          <h2 className="font-bold lg:text-xl text-text">
            {load ? (
              <Skeleton className="!w-24" />
            ) : (
              album && timeAndDate.getDate(album?.release_date)
            )}
          </h2>
          <h2 className="font-bold lg:text-xl text-text">
            {load ? (
              <Skeleton className="!w-24" />
            ) : (
              album &&
              playbackTime(
                album?.tracks?.items?.map((track) => track.duration_ms)
              )
            )}
          </h2>
        </div>

        <div className="flex items-center gap-1 mb-4 lg:my-8">
          {load ? (
            <img
              className="w-10 h-10 rounded-full lg:w-14 lg:h-14"
              src="../src/assets/logo.png"
              alt="logo"
            />
          ) : (
            <img
              loading="lazy"
              className="w-10 h-10 rounded-full lg:w-12 lg:h-12"
              src={artist?.images[2]?.url}
              alt={`${artist?.name} - artist profile`}
            />
          )}
          <h2 className="ml-1 font-bold lg:text-2xl text-text">
            {load ? <Skeleton className="!w-24" /> : artist?.name}
          </h2>
        </div>

        <footer className="my-4">
          <h2 className="text-sm lg:text-base text-gray">
            {load ? (
              <Skeleton className="!w-1/2" />
            ) : (
              album?.copyrights?.map((info) => {
                return (
                  <p
                    className="h-10 my-1 overflow-hidden line-clamp-2"
                    key={info.type}
                  >
                    {info.text}
                  </p>
                );
              })
            )}
          </h2>
        </footer>
      </div>
    </SkeletonTheme>
  );
};

export default AlbumInfo;
