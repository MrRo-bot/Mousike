export const initialState = {
  savedAlbums: [],
  savedArtists: [],
  savedTracks: [],
  newReleases: [],
  categories: [],
  genreSeeds: null,
  featuredPlaylists: [],
  token: null,
  user: null,
  userPlaylists: [],
  recentlyPlayed: [],
  item: null,
  playing: false,
  myTopTracks: [],
  myTopArtists: [],
  relatedArtists: [],
  recommendations: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_SAVED_ALBUMS":
      return {
        ...state,
        savedAlbums: action.savedAlbums,
      };

    case "SET_NEW_RELEASES":
      return {
        ...state,
        newReleases: action.newReleases,
      };

    case "SET_RECENTLY_PLAYED":
      return {
        ...state,
        recentlyPlayed: action.recentlyPlayed,
      };

    case "SET_GENRE_SEEDS":
      return {
        ...state,
        genreSeeds: action.genreSeeds,
      };

    case "SET_USER_PLAYLISTS":
      return {
        ...state,
        userPlaylists: action.userPlaylists,
      };

    case "SET_FEATURED_PLAYLISTS":
      return {
        ...state,
        featuredPlaylists: action.featuredPlaylists,
      };

    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.categories,
      };

    case "SET_SAVED_TRACKS":
      return {
        ...state,
        savedTracks: action.savedTracks,
      };

    case "SET_SAVED_ARTISTS":
      return {
        ...state,
        savedArtists: action.savedArtists,
      };

    case "SET_TOP_TRACKS":
      return {
        ...state,
        myTopTracks: action.myTopTracks,
      };

    case "SET_TOP_ARTISTS":
      return {
        ...state,
        myTopArtists: action.myTopArtists,
      };

    case "SET_RECOMMENDATIONS":
      return {
        ...state,
        recommendations: action.recommendations,
      };

    case "SET_RELATED_ARTISTS":
      return {
        ...state,
        relatedArtists: action.relatedArtists,
      };

    case "SET_ITEM":
      return {
        ...state,
        item: action.item,
      };

    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };

    default:
      return state;
  }
};

export default reducer;
