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

      console.table(params, code, returnedState, storedState);

      if (!code || returnedState !== storedState) {
        console.error("State mismatch or no code");
        navigate("/");
        return;
      }

      const verifier = localStorage.getItem("spotify_verifier");

      console.table(verifier);

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

      console.table(REDIRECT_URI, CLIENT_ID, verifier);

      try {
        const res = await fetch(TOKEN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body,
        });

        console.log(JSON.stringify(res));

        if (!res.ok) throw new Error("Token exchange failed");

        const data = await res.json();

        localStorage.setItem("spotify_access_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("spotify_refresh_token", data.refresh_token);
        }

        dispatch({ type: "SET_TOKEN", token: data.access_token });

        window.history.replaceState({}, "", "/");
      } catch (err) {
        console.error(err);
      }

      navigate("/");
    };

    handleCallback();
  }, [dispatch, navigate]);

  return <Loading />;
}
