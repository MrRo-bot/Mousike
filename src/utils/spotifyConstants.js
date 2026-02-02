export const CLIENT_ID = "1e09d4a478034001a97bc3b7333398e2";
export const REDIRECT_URI =
  import.meta.env.MODE === "development"
    ? "https://localhost:5173/callback"
    : "https://mousike.netlify.app/callback";

export const AUTH_URL = "https://accounts.spotify.com/authorize";
export const TOKEN_URL = "https://accounts.spotify.com/api/token";

export const SCOPES = [
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
].join(" ");

export const generateCodeVerifier = (length = 96) => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (dec) =>
    ("0" + dec.toString(16)).substring(-2),
  ).join("");
};

export const generateCodeChallenge = async (verifier) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const base64 = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return base64;
};
