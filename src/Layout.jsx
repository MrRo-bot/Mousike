/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";

import "./App.css";

import Loading from "./components/Loading";
import Loader from "./components/Loader";
import Login from "./pages/Login";
import Footer from "./components/Footer";

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
    let token = localStorage.getItem("spotify_access_token");
    try {
      if (token) {
        dispatch({
          type: "SET_TOKEN",
          token,
        });
        spotify.setAccessToken(token);
        spotify.getMe().then((user) =>
          dispatch({
            type: "SET_USER",
            user,
          }),
        );
        spotify.getMySavedAlbums().then((savedAlbums) => {
          dispatch({
            type: "SET_SAVED_ALBUMS",
            savedAlbums,
          });
        });
        spotify.getNewReleases().then((newReleases) => {
          dispatch({
            type: "SET_NEW_RELEASES",
            newReleases,
          });
        });
        spotify
          .getMyRecentlyPlayedTracks({ limit: 50 })
          .then((recentlyPlayed) => {
            dispatch({
              type: "SET_RECENTLY_PLAYED",
              recentlyPlayed,
            });
          });
        spotify.getAvailableGenreSeeds().then((genreSeeds) => {
          dispatch({
            type: "SET_GENRE_SEEDS",
            genreSeeds,
          });
        });
        spotify.getUserPlaylists().then((userPlaylists) => {
          dispatch({
            type: "SET_USER_PLAYLISTS",
            userPlaylists,
          });
        });
        spotify.getFeaturedPlaylists().then((featuredPlaylists) => {
          dispatch({
            type: "SET_FEATURED_PLAYLISTS",
            featuredPlaylists,
          });
        });
        spotify.getCategories({ limit: 50 }).then((categories) => {
          dispatch({
            type: "SET_CATEGORIES",
            categories,
          });
        });
        spotify.getFollowedArtists({ type: "artist" }).then((savedArtists) => {
          dispatch({
            type: "SET_SAVED_ARTISTS",
            savedArtists,
          });
        });
        spotify.getMyTopTracks().then((myTopTracks) => {
          dispatch({
            type: "SET_TOP_TRACKS",
            myTopTracks,
          });
        });
        spotify.getMyTopArtists().then((myTopArtists) => {
          dispatch({
            type: "SET_TOP_ARTISTS",
            myTopArtists,
          });
        });
        spotify.getMySavedTracks().then((savedTracks) => {
          dispatch({
            type: "SET_SAVED_TRACKS",
            savedTracks,
          });
        });
      }
    } catch (error) {
      alert(error);
    }
  }, [dispatch, spotify]);

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
