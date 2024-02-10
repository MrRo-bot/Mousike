/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { useDataContextValue } from "../Context/ProfileContext";

import Recents from "../components/Discover/Recents/Recents";
import TopTracks from "../components/Discover/TopTracks/TopTracks";
import TopArtists from "../components/Discover/TopArtists/TopArtists";
import NewReleases from "../components/Discover/NewReleases/NewReleases";
import FeaturedPlaylists from "../components/Discover/FeaturedPlaylists/FeaturedPlaylists";
import SimilarTo from "../components/Discover/SimilarTo/SimilarTo";
import Recommendations from "../components/Discover/Recommendations/Recommendations";
import Header from "../components/Discover/Header";

const Discover = ({ spotify }) => {
  const [state, dispatch] = useDataContextValue();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    spotify
      .getArtistRelatedArtists(
        state?.myTopArtists?.items[
          Math.floor(Math.random() * state?.myTopArtists?.items?.length)
        ]?.id
      )
      .then((relatedArtist) =>
        dispatch({
          type: "SET_RELATED_ARTISTS",
          relatedArtists: relatedArtist,
        })
      );

    spotify
      .getRecommendations({
        limit: 50,
        seed_artists: state?.myTopArtists?.items
          ?.map((artist) => artist.id)
          .slice(0, 1)
          .join("%2C"),
        seed_genres: state?.genreSeeds?.genres
          ?.map((genre) => genre)
          .slice(0, 3)
          .join("%2C"),
        seed_tracks: state?.myTopTracks?.items
          ?.map((track) => track.id)
          .slice(0, 1)
          .join("%2C"),
      })
      .then((recommendation) =>
        dispatch({
          type: "SET_RECOMMENDATIONS",
          recommendations: recommendation,
        })
      );

    setTimeout(() => {
      setLoading(true);
    }, 2500);
  }, [
    state?.myTopArtists,
    dispatch,
    state?.genreSeeds,
    state?.myTopTracks,
    spotify,
  ]);

  return (
    <div className="bg-background sm:pl-6">
      <header>{<Header items={state?.user} />}</header>

      <div>
        {<Recents items={state?.recentlyPlayed} />}
        {<NewReleases title="New Releases" items={state?.newReleases} />}
        {
          <FeaturedPlaylists
            title="Featured Playlists"
            items={state?.featuredPlaylists}
          />
        }
        {<TopTracks title="Your Top Tracks" items={state?.myTopTracks} />}
        {<TopArtists title="Your Top Artists" items={state?.myTopArtists} />}
        {loading && (
          <Recommendations
            title="Recommendations"
            items={state?.recommendations}
          />
        )}
        {loading && (
          <SimilarTo
            title="Similar to your artists"
            items={state?.relatedArtists}
          />
        )}
      </div>
    </div>
  );
};

export default Discover;
