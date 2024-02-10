const Loading = () => {
  return (
    <div className="grid place-items-center w-[95vw] h-[66vh]">
      <div className="flex gap-4">
        <div className="z-10 flex w-6 h-24 overflow-hidden shadow-neo rounded-xl bg-slate-100">
          <div className="animate-[loaderKeyframes_1.5s_0s_ease-in-out_infinite] relative translate-y-[4.5rem] z-0 w-full h-full rounded-xl bg-[hsl(207,_100%,_50%)]">
            <span className="absolute top-0  z-[1] border-0 border-solid border-bg-slate-100 bg-slate-100 block h-6 w-full rounded-full shadow-loaderCircle"></span>
          </div>
        </div>

        <div className="z-10 flex w-6 h-24 overflow-hidden shadow-neo rounded-xl bg-slate-100">
          <div className="animate-[loaderKeyframes_1.5s_0.25s_ease-in-out_infinite] relative translate-y-[4.5rem] z-0 w-full h-full rounded-xl bg-[hsl(207,_100%,_50%)]">
            <span className="absolute top-0 z-[1] border-0 border-solid border-bg-slate-100 bg-slate-100 block h-6 w-full rounded-full shadow-loaderCircle"></span>
          </div>
        </div>

        <div className="z-10 flex w-6 h-24 overflow-hidden shadow-neo rounded-xl bg-slate-100">
          <div className="animate-[loaderKeyframes_1.5s_0.5s_ease-in-out_infinite] relative translate-y-[4.5rem] z-0 w-full h-full rounded-xl bg-[hsl(207,_100%,_50%)]">
            <span className="absolute top-0 z-[1] border-0 border-solid border-bg-slate-100 bg-slate-100 block h-6 w-full rounded-full shadow-loaderCircle"></span>
          </div>
        </div>

        <div className="z-10 flex w-6 h-24 overflow-hidden shadow-neo rounded-xl bg-slate-100">
          <div className="animate-[loaderKeyframes_1.5s_0.75s_ease-in-out_infinite] relative translate-y-[4.5rem] z-0 w-full h-full rounded-xl bg-[hsl(207,_100%,_50%)]">
            <span className="absolute top-0 z-[1] border-0 border-solid border-bg-slate-100 bg-slate-100 block h-6 w-full rounded-full shadow-loaderCircle"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
