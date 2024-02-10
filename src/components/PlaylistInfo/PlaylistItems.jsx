/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useAnimate } from "framer-motion";
import { randNum } from "../../utils/Math";

const PlaylistItems = ({ items }) => {
  const [scope, animate] = useAnimate();
  const onHeartClick = () => {
    const hearts = Array.from({ length: 7 });

    const heartsAnimation = hearts.map((_, index) => [
      `.heart-${index}`,
      {
        x: randNum(-10, 10),
        y: randNum(-10, -50),
        scale: 1,
        opacity: 1,
      },
      {
        duration: 0.4,
        at: "<",
      },
    ]);

    const heartsFadeOut = hearts.map((_, index) => [
      `.heart-${index}`,
      { opacity: 0 },
      {
        duration: 0.3,
        at: "<",
      },
    ]);

    const heartsReset = hearts.map((_, index) => [
      `.heart-${index}`,
      { x: 0, y: 0 },
      { duration: 0.00001 },
    ]);

    animate([
      ...heartsReset,
      [".heartIcon", { color: "hsl(180, 63%, 41%)" }],
      ...heartsAnimation,
      [".heartIcon", { color: "hsl(218, 11%, 65%)" }],
      ...heartsFadeOut,
    ]);
  };
  return (
    // <div className="flex items-center justify-between">
    //   <div className="flex w-10/12 gap-2">
    //     <div>
    //       <img loading="lazy"
    //         className="w-[10vw] aspect-square"
    //         src={items.track.album.images[1].url}
    //         alt={`${items.track.name} - album art`}
    //       />
    //     </div>
    //     <div>
    //       <h2 className="text-base font-semibold truncate text-text">
    //         { items.track.name}
    //       </h2>
    //       <h3 className="text-sm font-medium truncate text-gray">
    //         { items.track.explicit ? "\uD83C\uDD74" : ""}
    //         {
    //           items.track.artists
    //             .reduce((list, artist) => [...list, artist.name], [])
    //             .join(", ")}
    //       </h3>
    //     </div>
    //   </div>
    //   <div className="flex w-2/12 gap-2">
    //     <div className="p-1 rounded-full shadow-neo">
    //       <FontAwesomeIcon
    //         icon={icon({ name: "heart", style: "solid" })}
    //         className="block mx-auto text-text"
    //       />
    //     </div>
    //     <FontAwesomeIcon
    //       icon={icon({ name: "ellipsis-vertical", style: "solid" })}
    //       className="block mx-auto text-text"
    //     />
    //   </div>
    // </div>

    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-around lg:justify-start">
        <img
          loading="lazy"
          className="w-[10vw] lg:w-[8vw] aspect-square shadow-neo"
          src={items?.track?.album?.images[1]?.url}
          alt={`${items?.track?.album?.name} - album art`}
        />

        <div className="w-[65vw] pl-1 lg:ml-[1%]">
          <h3 className="font-bold truncate lg:text-2xl text-text lg:mb-2">
            {items?.track?.name}
          </h3>
          <div className="flex items-center gap-1">
            {items?.track?.explicit ? (
              <span className="grid place-items-center rounded-[0.1rem] w-3 h-3 bg-gray text-[8px] text-background">
                E
              </span>
            ) : (
              ""
            )}
            <h4 className="text-xs truncate lg:text-base text-gray">
              {items?.track?.artists
                .reduce((list, artist) => [...list, artist?.name], [])
                .join(", ")}
            </h4>
          </div>
        </div>

        <div className="flex justify-between lg:ml-auto lg:justify-end items-center w-[10vw]">
          <div
            ref={scope}
            onClick={onHeartClick}
            className="relative grid p-1 rounded-full cursor-pointer lg:p-2 shadow-neo active:shadow-none focus:shadow-none place-items-center"
          >
            <FontAwesomeIcon
              icon={icon({ name: "heart", style: "solid" })}
              className="text-base lg:text-xl heartIcon text-gray transform-gpu"
            />
            {Array.from({ length: 7 }).map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={icon({ name: "heart", style: "solid" })}
                className={`heart-${index} text-text absolute opacity-0 pointer-events-none transform-gpu`}
              />
            ))}
          </div>

          <FontAwesomeIcon
            icon={icon({ name: "ellipsis-vertical", style: "solid" })}
            className="cursor-pointer text-gray lg:text-xl active:scale-125 lg:ml-[30%]"
          />
        </div>
      </div>
    </div>
  );
};

export default PlaylistItems;
