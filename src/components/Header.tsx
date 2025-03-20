import { useMemo } from "react";
import { debounce } from "lodash";

function Header(item: {
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        item.setSearchFilter(value);
      }, 1000),
    [item]
  );

  return (
    <>
      <div className="flex justify-between items-center border-1 border-solid w-full h-24">
        <div className="left-0 m-4">Actions type</div>
        <div className="border-1 border-solid w-96 h-[50px] right-0 m-4">
          <input
            className="w-96 h-[50px] placeholder:p-2"
            type="text"
            placeholder="Search"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
