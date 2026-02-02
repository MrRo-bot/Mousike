import logo from "../assets/logo.png";

const Loader = () => {
  return (
    <div className="relative z-50 w-full h-screen overflow-hidden bg-background">
      <img
        loading="lazy"
        className="absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full lg:w-60 lg:h-60 left-1/2 top-1/2 shadow-neo"
        src={logo}
        alt="logo"
      />
      <div className="absolute flex text-6xl justify-center gap-1 -translate-x-1/2 w-[80%] left-1/2 -translate-y-1/2 top-3/4 ">
        <div className="opacity-0 text-2xl lg:text-4xl font-extrabold text-button text-center animate-[openingSequence_1s_0.75s_linear_forwards]">
          m
        </div>
        <div className="opacity-0 text-2xl lg:text-4xl font-extrabold text-button text-center animate-[openingSequence_1s_0.5s_linear_forwards]">
          o
        </div>
        <div className="opacity-0 text-2xl lg:text-4xl font-extrabold text-button text-center animate-[openingSequence_1s_0.25s_linear_forwards]">
          u
        </div>
        <div className="opacity-0 text-2xl lg:text-4xl font-extrabold text-button text-center animate-[openingSequence_1s_linear_forwards]">
          s
        </div>
        <div className="opacity-0 text-2xl lg:text-4xl font-extrabold text-button text-center animate-[openingSequence_1s_0.25s_linear_forwards]">
          i
        </div>
        <div className="opacity-0 text-2xl lg:text-4xl font-extrabold text-button text-center animate-[openingSequence_1s_0.5s_linear_forwards]">
          k
        </div>
        <div className="opacity-0 text-2xl lg:text-4xl font-extrabold text-button text-center animate-[openingSequence_1s_0.75s_linear_forwards]">
          e
        </div>
      </div>
    </div>
  );
};

export default Loader;
