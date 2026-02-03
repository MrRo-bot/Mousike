import {
  AUTH_URL,
  CLIENT_ID,
  generateCodeChallenge,
  generateCodeVerifier,
  REDIRECT_URI,
  SCOPES,
} from "../utils/spotifyConstants";

import logo from "../assets/logo.png";

const Login = () => {
  const handleLogin = async () => {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("spotify_verifier", verifier);

    const state = generateCodeVerifier(16);
    localStorage.setItem("spotify_state", state);

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: "code",
      redirect_uri: REDIRECT_URI,
      scope: SCOPES,
      code_challenge_method: "S256",
      code_challenge: challenge,
      state: state,
      show_dialog: "true",
    });

    window.location.href = `${AUTH_URL}?${params.toString()}`;
  };

  return (
    <div className="grid w-screen h-screen place-items-center">
      <div className="grid place-items-center rounded-3xl shadow-neo w-80 h-80 lg:w-96 lg:h-96">
        <div className="flex gap-2">
          <img loading="lazy" className="h-10 lg:h-14" src={logo} alt="logo" />
          <h1 className="text-4xl lg:text-5xl headingGradient">Mousike</h1>
        </div>
        <button
          className="lg:text-xl scale-[1.04] font-extrabold text-background px-2 py-3 rounded-xl shadow-buttonShadow bg-button active:scale-[1] active:shadow-none transition-all"
          onClick={handleLogin}
        >
          Login with Spotify
        </button>
      </div>
    </div>
  );
};

export default Login;
