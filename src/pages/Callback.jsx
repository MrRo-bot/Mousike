import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CLIENT_ID, REDIRECT_URI, TOKEN_URL } from "../utils/spotifyConstants";
import { useDataContextValue } from "../Context/ProfileContext";
import Loading from "../components/Loading";

export default function Callback() {
  const navigate = useNavigate();
  const [dispatch] = useDataContextValue();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const returnedState = params.get("state");
      const storedState = localStorage.getItem("spotify_state");

      console.error("params", params);
      console.error("code", code);
      console.error("returnedState", returnedState);
      console.error("storedState", storedState);

      if (!code || returnedState !== storedState) {
        console.error("State mismatch or no code");
        navigate("/");
        return;
      }

      const verifier = localStorage.getItem("spotify_verifier");

      console.error("verifier", verifier);

      if (!verifier) {
        console.error("No verifier");
        navigate("/");
        return;
      }

      localStorage.removeItem("spotify_verifier");
      localStorage.removeItem("spotify_state");

      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        code_verifier: verifier,
      });

      console.error("REDIRECT_URI", REDIRECT_URI);
      console.error("CLIENT_ID", CLIENT_ID);
      console.error("verifier", verifier);

      try {
        const res = await fetch(TOKEN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body,
        });

        console.error("res", JSON.stringify(res));

        if (!res.ok) throw new Error("Token exchange failed");

        const data = await res.json();

        localStorage.setItem("spotify_access_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("spotify_refresh_token", data.refresh_token);
        }

        dispatch({ type: "SET_TOKEN", token: data.access_token });

        window.history.replaceState({}, "", "/");
      } catch (err) {
        console.error("error", err);
      }

      navigate("/");
    };

    handleCallback();
  }, [dispatch, navigate]);

  return <Loading />;
}
