import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { nanoid } from "nanoid";

import { useDataContextValue } from "../Context/ProfileContext";

import LibraryAlbumItems from "../components/UsersLibrary/LibraryAlbumItems";
import LibraryArtistItems from "../components/UsersLibrary/LibraryArtistItems";
import LibraryPlaylistItems from "../components/UsersLibrary/LibraryPlaylistItems";

const Library = () => {
  const [state] = useDataContextValue();
  return (
    <div className="h-full bg-background lg:px-6">
      <header className="sticky top-0 z-50 flex items-start justify-start gap-2 p-2 lg:py-5 bg-background">
        <div className="grid w-8 h-8 rounded-full cursor-pointer lg:w-10 lg:h-10 place-items-center">
          <img
            loading="lazy"
            className="w-full h-full rounded-full"
            src={state?.user?.images[1].url}
            alt={`${state?.user?.display_name} profile picture`}
          />
        </div>
        <h2 className="text-2xl font-extrabold lg:text-4xl text-text">
          Your Library
        </h2>
      </header>
      <div className="px-2">
        <div className="flex flex-col gap-4 mb-4">
          <Link
            to="likedSongs"
            className="relative flex items-center justify-start gap-4 mt-4"
          >
            <div className="bg-likedSongs w-auto grid place-items-center rounded-lg lg:rounded-2xl aspect-square h-[10vh] lg:h-[20vh] p-1.5">
              <FontAwesomeIcon
                icon={icon({ name: "heart", style: "solid" })}
                className="text-xl text-white lg:text-6xl"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold lg:text-2xl text-text">
                Liked songs
              </h3>
              <h4 className="text-xs font-semibold lg:text-base text-gray">
                Playlist . {state?.savedTracks?.total}
              </h4>
            </div>
          </Link>

          {state?.savedArtists?.artists?.items?.map((artist) => (
            <LibraryArtistItems key={nanoid()} items={artist} />
          ))}
          {state?.userPlaylists?.items?.map((playlist) => (
            <LibraryPlaylistItems key={nanoid()} items={playlist} />
          ))}
          {state?.savedAlbums?.items?.map((album) => (
            <LibraryAlbumItems key={nanoid()} items={album} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
