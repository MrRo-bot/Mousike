/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import logo from "../assets/logo.png";

import { nanoid } from "nanoid";

import { useDataContextValue } from "../Context/ProfileContext";

// import SearchItems from "../components/Search/SearchItems";
import SearchAlbumItems from "../components/Search/SearchAlbumItems";
import SearchArtistItems from "../components/Search/SearchArtistItems";
import SearchPlaylistItems from "../components/Search/SearchPlaylistItems";
import SearchTrackItems from "../components/Search/SearchTrackItems";

const Search = ({ spotify }) => {
  const [state] = useDataContextValue();

  const [searchData, setSearchData] = useState([]);

  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    (async () => {
      spotify
        .search(searchString, ["album", "artist", "playlist", "track"], {
          limit: 10,
        })
        .then((searchItems) => {
          const shuffled = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
          };
          setSearchData(
            shuffled([
              ...searchItems.albums.items,
              ...searchItems.artists.items,
              ...searchItems.tracks.items,
              ...searchItems.playlists.items,
            ]),
          );
        });
    })();
  }, [searchString]);

  return (
    <div className="bg-background lg:px-6">
      <header className="flex gap-2 px-2 py-5">
        <div className="grid w-8 h-8 rounded-full cursor-pointer lg:w-10 lg:h-10 place-items-center">
          <img
            loading="lazy"
            className="w-full h-full rounded-full"
            src={state?.user?.images[1]?.url}
            alt={`${state?.user?.display_name} profile picture`}
          />
        </div>

        <h2 className="font-extrabold text-2x lg:text-4xl text-text">Search</h2>
      </header>
      <div>
        <div className="sticky top-0 flex items-stretch h-full gap-2 px-2 py-2 z-[100] bg-background">
          <input
            autoFocus
            className="pl-8 shadow-neoInset bg-[url('assets/search.png')] bg-no-repeat bg-[length:1.2em] bg-[0.5em_center] bg-origin-padding w-full lg:w-[80%] bg-background h-10 lg:h-14 mx-auto rounded-md text-text font-bold"
            type="text"
            name="search"
            id="search"
            placeholder="What do you want to listen to?"
            onChange={(event) => {
              setSearchString(event.target.value);
            }}
          />
          {/* <button
            className="grid px-4 font-bold rounded-md cursor-pointer place-items-center text-text shadow-neoRaised active:shadow-neoInset"
          >
            Find
          </button> */}
        </div>
        <div className="px-2">
          {/* <h3 className="mb-3 text-sm font-extrabold text-text">Browse all</h3> */}
          {/* <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(13rem,3fr))] gap-3 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10"> */}
          {/* {state.categories.categories.items.map((category) => (
              <SearchItems key={nanoid()} items={category} />
            ))} */}
          <div className="flex flex-col flex-wrap items-center justify-center gap-2 min-h-[67vh] lg:min-h-[61vh]">
            {searchData?.length === 0 ? (
              <>
                <img
                  className="max-w-[15rem] lg:max-w-[20rem] aspect-square"
                  src={logo}
                  alt="logo"
                />
                <p className=" text-text lg:text-lg lg:font-bold">
                  Play what you love!! 😇😇😇
                </p>
              </>
            ) : (
              searchData?.map((item) =>
                item?.type === "album" ? (
                  <SearchAlbumItems key={nanoid()} items={item} />
                ) : item?.type === "track" ? (
                  <SearchTrackItems key={nanoid()} items={item} />
                ) : item?.type === "artist" ? (
                  <SearchArtistItems key={nanoid()} items={item} />
                ) : (
                  <SearchPlaylistItems key={nanoid()} items={item} />
                ),
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
