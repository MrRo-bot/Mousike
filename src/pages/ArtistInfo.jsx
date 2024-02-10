/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { Link, useParams } from "react-router-dom";

import { nanoid } from "nanoid";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { motion, useScroll, useTransform } from "framer-motion";

import ArtistItems from "../components/ArtistInfo/ArtistItems";
import Discography from "../components/ArtistInfo/Discography";
import { NumericFormat } from "react-number-format";

const ArtistInfo = ({ spotify }) => {
  const [isFollow, setIsFollow] = useState(false);

  const artistData = useParams();

  const [artist, setArtist] = useState({
    artistDetail: {},
    albums: {},
    topTracks: [],
  });

  const [load, setLoad] = useState(true);

  const artistRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: artistRef,
    offset: ["0, 1", "0, 0"],
  });

  const opacityProgress = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

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
      .getArtist(artistData.artistId)
      .then((artist) =>
        setArtist((prev) => ({ ...prev, artistDetail: artist }))
      );

    spotify
      .getArtistAlbums(artistData.artistId, {
        limit: 50,
        market: "IN",
        include_groups: ["album", "single", "appears_on", "compilation"],
      })
      .then((album) => setArtist((prev) => ({ ...prev, albums: album })));

    spotify
      .getArtistTopTracks(artistData.artistId, "IN")
      .then((track) => setArtist((prev) => ({ ...prev, topTracks: track })));
  }, [artistData, spotify]);

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
      <div>
        <motion.div
          style={{
            backgroundColor: colorProgress,
          }}
          className="z-[1000] fixed top-0 flex items-center justify-start w-full gap-2 px-5 py-2"
        >
          <Link
            to="/"
            className="rounded-full outline-1 outline-text outline-dotted"
          >
            <FontAwesomeIcon
              icon={icon({ name: "arrow-left-long", style: "solid" })}
              className="p-1 text-xl rounded-full text-text lg:text-2xl lg:p-2"
            />
          </Link>

          <motion.h2
            style={{ opacity: opacityProgress }}
            className="text-xl font-extrabold truncate lg:p-4 text-text"
          >
            {artist?.artistDetail?.name}
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

        <header className="relative pb-5 before:bg-artistInfo before:absolute before:inset-0 h-[50vh]">
          <div className="fixed w-full h-1/2 -z-[1000]">
            {load ? (
              <img
                className="absolute object-cover w-full h-full aspect-square"
                src="../src/assets/logo.png"
                alt="logo"
              />
            ) : (
              <img
                loading="lazy"
                className="absolute object-cover w-full h-full aspect-square"
                src={artist?.artistDetail?.images[0]?.url}
                alt={`${artist?.artistDetail?.name} - artist profile`}
              />
            )}
          </div>

          <div className="absolute bottom-0 flex gap-4 m-5 place-items-center">
            {windowWidth >= 1024 ? (
              <div className="w-20 overflow-hidden rounded-full">
                {load ? (
                  <img
                    className="w-full h-full aspect-square"
                    src="../src/assets/logo.png"
                    alt="logo"
                  />
                ) : (
                  <img
                    loading="lazy"
                    className="w-full h-full aspect-square"
                    src={artist?.artistDetail?.images[0]?.url}
                    alt={`${artist?.artistDetail?.name} - artist profile`}
                  />
                )}
              </div>
            ) : (
              ""
            )}
            <h1 className="text-5xl font-black tracking-tighter capitalize text-background">
              {artist?.artistDetail?.name}
            </h1>
          </div>
        </header>
        <div ref={artistRef} className="px-5 pt-4 mb-5 bg-background">
          <div className="mb-2 text-sm font-bold lg:text-base text-gray">
            <NumericFormat
              displayType="text"
              thousandSeparator=","
              thousandsGroupStyle="thousand"
              value={artist?.artistDetail?.followers?.total}
            />{" "}
            followers
          </div>
          <div className="mb-5">
            <div className="flex justify-between lg:py-2">
              <div className="flex items-center gap-8 lg:gap-16">
                <div
                  onClick={() => setIsFollow(!isFollow)}
                  className={`px-2 py-1 text-xs lg:text-base font-bold border-2 border-solid rounded-md cursor-pointer transition-all ${
                    !isFollow
                      ? "text-gray border-gray shadow-neo"
                      : "text-text border-lime-400 shadow-none"
                  }`}
                >
                  {isFollow ? "Following" : "Follow"}
                </div>
                <FontAwesomeIcon
                  icon={icon({ name: "ellipsis-vertical", style: "solid" })}
                  className="cursor-pointer text-gray lg:text-xl active:scale-125"
                />
              </div>
              <div className="flex items-center gap-8">
                <FontAwesomeIcon
                  icon={icon({ name: "shuffle", style: "solid" })}
                  className="cursor-pointer lg:text-xl text-gray active:scale-125"
                />
                <div className="grid w-10 h-10 rounded-full cursor-pointer lg:w-12 lg:h-12 place-items-center shadow-neoRaised active:shadow-none">
                  <FontAwesomeIcon
                    icon={icon({ name: "play", style: "solid" })}
                    className="text-xl text-text"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-10 lg:pt-4 lg:gap-4">
            <h2 className="mb-2 text-xl font-bold lg:text-3xl text-text">
              Popular releases
            </h2>
            {load ? (
              <div className="flex gap-2">
                <Skeleton className="!w-20 !h-20" />
                <div className="w-full">
                  <Skeleton className="!w-1/2 top-2" />
                  <Skeleton className="!w-1/3 top-4" />
                </div>
              </div>
            ) : (
              artist?.topTracks?.tracks?.map((track) => (
                <ArtistItems
                  key={nanoid()}
                  items={track}
                  windowWidth={windowWidth}
                />
              ))
            )}
          </div>

          <div className="flex flex-col gap-3 mb-10">
            <h2 className="mb-2 text-xl font-bold lg:text-4xl text-text">
              Discography
            </h2>
            {load ? (
              <div className="flex gap-2">
                <Skeleton className="!w-20 !h-20" />
                <div className="w-full">
                  <Skeleton className="!w-1/2 top-2" />
                  <Skeleton className="!w-1/3 top-4" />
                </div>
              </div>
            ) : (
              <Discography items={artist?.albums} />
            )}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ArtistInfo;
