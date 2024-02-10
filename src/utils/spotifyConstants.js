export const OAuthEndPoint = "https://accounts.spotify.com/authorize";

const redirectUri = "https://mousike.netlify.app";

const clientId = "1e09d4a478034001a97bc3b7333398e2";

const scopes = [
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "user-follow-read",
  "user-library-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-modify-playback-state",
];

export const loginUrl = `${OAuthEndPoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = parts[1];
      return initial;
    }, {});
};
