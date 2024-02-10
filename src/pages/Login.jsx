import { loginUrl } from "../utils/spotifyConstants";

const Login = () => {
  return (
    <div className="grid w-screen h-screen place-items-center">
      <div className="grid place-items-center rounded-3xl shadow-neo w-80 h-80 lg:w-96 lg:h-96">
        <div className="flex gap-2">
          <img
            loading="lazy"
            className="h-10 lg:h-14"
            src="../src/assets/logo.png"
            alt="logo"
          />
          <h1 className="text-4xl lg:text-5xl headingGradient">Mousike</h1>
        </div>
        <a
          target="_self"
          className="lg:text-xl scale-[1.04] font-extrabold text-background px-2 py-3 rounded-xl shadow-buttonShadow bg-button active:scale-[1] active:shadow-none transition-all"
          href={loginUrl}
        >
          Login with Spotify
        </a>
      </div>
    </div>
  );
};

export default Login;
