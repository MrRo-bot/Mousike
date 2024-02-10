/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";

import "./App.css";

import Loading from "./components/Loading";
import Loader from "./components/Loader";
import Login from "./pages/Login";
import Footer from "./components/Footer";

import { getTokenFromUrl } from "./utils/spotifyConstants";

import { useDataContextValue } from "./Context/ProfileContext";

const Layout = ({ spotify }) => {
  const [loading, setLoading] = useState(true);

  const [state, dispatch] = useDataContextValue();

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  });

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    let _token = hash.access_token;
    try {
      if (_token) {
        dispatch({
          type: "SET_TOKEN",
          token: _token,
        });
        spotify.setAccessToken(_token);
        spotify.getMe().then((user) =>
          dispatch({
            type: "SET_USER",
            user: user,
          })
        );
        spotify.getMySavedAlbums().then((savedAlbum) => {
          dispatch({
            type: "SET_SAVED_ALBUMS",
            savedAlbums: savedAlbum,
          });
        });
        spotify.getNewReleases().then((newRelease) => {
          dispatch({
            type: "SET_NEW_RELEASES",
            newReleases: newRelease,
          });
        });
        spotify.getMyRecentlyPlayedTracks({ limit: 50 }).then((recentPlays) => {
          dispatch({
            type: "SET_RECENTLY_PLAYED",
            recentlyPlayed: recentPlays,
          });
        });
        spotify.getAvailableGenreSeeds().then((genreSeed) => {
          dispatch({
            type: "SET_GENRE_SEEDS",
            genreSeeds: genreSeed,
          });
        });
        spotify.getUserPlaylists().then((userPlaylist) => {
          dispatch({
            type: "SET_USER_PLAYLISTS",
            userPlaylists: userPlaylist,
          });
        });
        spotify.getFeaturedPlaylists().then((featuredPlaylist) => {
          dispatch({
            type: "SET_FEATURED_PLAYLISTS",
            featuredPlaylists: featuredPlaylist,
          });
        });
        spotify.getCategories({ limit: 50 }).then((category) => {
          dispatch({
            type: "SET_CATEGORIES",
            categories: category,
          });
        });
        spotify.getFollowedArtists({ type: "artist" }).then((savedArtist) => {
          dispatch({
            type: "SET_SAVED_ARTISTS",
            savedArtists: savedArtist,
          });
        });
        spotify.getMyTopTracks().then((topTrack) => {
          dispatch({
            type: "SET_TOP_TRACKS",
            myTopTracks: topTrack,
          });
        });
        spotify.getMyTopArtists().then((topArtist) => {
          dispatch({
            type: "SET_TOP_ARTISTS",
            myTopArtists: topArtist,
          });
        });
        spotify.getMySavedTracks().then((savedTrack) => {
          dispatch({
            type: "SET_SAVED_TRACKS",
            savedTracks: savedTrack,
          });
        });
      }
    } catch (error) {
      alert(error);
    }
  }, [state, dispatch, spotify]);

  return state?.token ? (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main>
          {navigation?.state === "loading" && <Loading />}
          <ScrollRestoration /> <Outlet />
          {location?.pathname === "/player" ? "" : <Footer spotify={spotify} />}
        </main>
      )}
    </>
  ) : (
    <>{loading ? <Loader /> : <Login />}</>
  );
};

export default Layout;
