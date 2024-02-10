/* eslint-disable react/prop-types */

const SearchItems = ({ items }) => {
  return (
    <div className="flex items-start justify-between h-full overflow-hidden rounded-md shadow-neo">
      <div className="w-[55%]">
        <h3 className="mt-2 ml-2 text-sm font-bold truncate text-text">
          {items?.name}
        </h3>
      </div>
      <div className="w-[45%]">
        {
          <img
            loading="lazy"
            className="w-full min-h-min"
            src={items?.icons[0]?.url}
            alt={`${items?.name} - artwork `}
          />
        }
      </div>
    </div>
  );
};

export default SearchItems;
