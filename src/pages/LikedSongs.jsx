/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

import { nanoid } from "nanoid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { Link } from "react-router-dom";

import { motion, useScroll, useTransform } from "framer-motion";

import LikedItems from "../components/UsersLibrary/LikedItems";
import { useDataContextValue } from "../Context/ProfileContext";

const LikedSongs = ({ spotify }) => {
  const [state, dispatch] = useDataContextValue();

  const likedSongsRef = useRef(null);

  const [data, setData] = useState(state?.savedTracks);

  const [paginate, setPaginate] = useState({ limit: 10, offset: 0, page: 1 });

  useEffect(() => {
    const getCardData = async () => {
      spotify
        .getMySavedTracks({ limit: paginate.limit, offset: paginate.offset })
        .then((savedTrack) => {
          setData((prev) => ({
            ...prev,
            items: [...prev.items, ...savedTrack.items],
          }));
        });
    };
    getCardData();
  }, [paginate, dispatch, state, spotify]);

  const handleInfiniteScroll = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPaginate((prev) => ({
          ...prev,
          offset: prev.limit * (prev.page - 1),
        }));
        setPaginate((prev) => ({ ...prev, page: prev.page + 1 }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: likedSongsRef,
    offset: ["1, 0", "-4, 0"],
  });

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
    ]
  );

  return (
    <div className="h-full bg-background lg:px-6">
      <motion.header
        style={{ backgroundColor: colorProgress }}
        className="sticky top-0 flex items-center gap-2 p-2"
      >
        <Link to="/library">
          <FontAwesomeIcon
            icon={icon({ name: "arrow-left-long", style: "solid" })}
            className="p-1 text-xl rounded-full text-text shadow-neo bg-background active:shadow-neoInset lg:text-2xl lg:p-2"
          />
        </Link>
        <motion.h3
          style={{ opacity: opacityProgress }}
          className="text-xl font-extrabold truncate max-w-[70vw] text-text lg:pl-4"
        >
          Liked Songs
        </motion.h3>

        <motion.div
          style={{ opacity: opacityProgress }}
          className="grid w-10 h-10 ml-auto rounded-full cursor-pointer place-items-center bg-background shadow-neoRaised active:shadow-none"
        >
          <FontAwesomeIcon
            icon={icon({ name: "play", style: "solid" })}
            className="text-text"
          />
        </motion.div>
      </motion.header>

      {/* <div className="flex justify-center h-full gap-2 px-2 py-2">
        <input
          className="pl-8 lg:h-16 lg:w-[70%] lg:font-bold shadow-neo bg-[url('assets/search.png')] bg-no-repeat bg-[length:1.2em] bg-[0.5em_center] bg-origin-padding w-full lg:text-lg bg-background/50 h-8 rounded-md"
          type="text"
          name="search"
          id="search"
          //   value={something}
          placeholder="Find in liked songs"
          onChange={() => {}}
        />
        <div className="grid px-4 font-bold rounded-md cursor-pointer lg:text-xl lg:ml-4 place-items-center text-text shadow-neoRaised active:shadow-neoInset">
          Sort
        </div>
      </div> */}

      <div className="px-2 mt-10">
        <h1 className="mb-2 text-2xl font-extrabold lg:text-4xl text-text">
          Liked Songs
        </h1>
        <h2 className="text-xs font-extrabold lg:text-base text-gray">
          {`${state?.savedTracks?.total} songs`}
        </h2>
      </div>

      <div
        ref={likedSongsRef}
        className="flex items-center justify-end px-2 my-2"
      >
        <div className="flex items-center gap-5 lg:gap-10">
          <FontAwesomeIcon
            icon={icon({ name: "shuffle", style: "solid" })}
            className="cursor-pointer text-gray active:scale-125 lg:text-2xl"
          />
          <div className="grid w-10 h-10 rounded-full cursor-pointer lg:w-14 lg:h-14 place-items-center bg-background shadow-neoRaised active:shadow-none">
            <FontAwesomeIcon
              icon={icon({ name: "play", style: "solid" })}
              className="text-text lg:text-2xl"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-2 mb-4 lg:mt-8">
        {data?.items?.map((songs) => (
          <LikedItems key={nanoid()} items={songs.track} />
        ))}
      </div>

      <footer></footer>
    </div>
  );
};

export default LikedSongs;
