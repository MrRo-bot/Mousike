/* eslint-disable react/prop-types */
const DiscographyItems = ({ items }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-between gap-2">
        <div className="w-20 p-1 rounded-sm lg:w-28 shadow-neo">
          <img
            loading="lazy"
            className="w-full"
            src={items?.images[1]?.url}
            alt={`${items?.name} - artist profile`}
          />
        </div>
        <div className="w-[70vw]">
          <h3 className="font-bold truncate lg:text-xl text-text">
            {items?.name}
          </h3>
          <h4 className="text-sm font-medium capitalize truncate lg:text-base text-gray">
            {items?.release_date?.slice(0, 4)}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default DiscographyItems;
