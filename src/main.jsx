import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ProfileContext } from "./Context/ProfileContext";
import reducer, { initialState } from "./reducers/ProfileReducer";

import SpotifyWebApi from "spotify-web-api-js";
const spotify = new SpotifyWebApi();

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./Layout.jsx";
import Discover from "./pages/Discover.jsx";
import Search from "./pages/Search.jsx";
import Library from "./pages/Library.jsx";
import Player from "./pages/Player.jsx";
import LikedSongs from "./pages/LikedSongs.jsx";
import AlbumInfo from "./pages/AlbumInfo.jsx";
import ArtistInfo from "./pages/ArtistInfo.jsx";
import PlaylistInfo from "./pages/PlaylistInfo.jsx";

const reactRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout spotify={spotify} />}>
      <Route path="/" element={<Discover spotify={spotify} />} />
      <Route path="search" element={<Search spotify={spotify} />} />
      <Route path="library" element={<Library spotify={spotify} />} />
      <Route path="player" element={<Player spotify={spotify} />} />
      <Route
        path="albumInfo/:albumId"
        element={<AlbumInfo spotify={spotify} />}
      />
      <Route
        path="artistInfo/:artistId"
        element={<ArtistInfo spotify={spotify} />}
      />
      <Route
        path="playlistInfo/:playlistId"
        element={<PlaylistInfo spotify={spotify} />}
      />
      <Route
        path="library/likedSongs"
        element={<LikedSongs spotify={spotify} />}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProfileContext initialState={initialState} reducer={reducer}>
      <RouterProvider router={reactRoutes}>
        <App />
      </RouterProvider>
    </ProfileContext>
  </React.StrictMode>
);
