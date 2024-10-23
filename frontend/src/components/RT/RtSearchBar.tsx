import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface RtSearchBarProps {
  nameSetter: (name: string) => void;
  materiel: { name: string; id: number }[];
}

function RtSearchBar({ nameSetter, materiel }: RtSearchBarProps) {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<{ name: string; id: number }[]>([]);

  useEffect(() => {
    const SearchInput = document.querySelector<HTMLInputElement>("#searchInput");

    const handleBlur = () => {
      const autoComplete = document.querySelector<HTMLUListElement>("#autoComplete");
      if (autoComplete) {
        autoComplete.classList.add("hidden");
      }
    };

    const handleFocus = () => {
      const autoComplete = document.querySelector<HTMLUListElement>("#autoComplete");
      if (autoComplete) {
        autoComplete.classList.remove("hidden");
      }
    };



    return () => {
      if (SearchInput) {
        SearchInput.removeEventListener("blur", handleBlur);
        SearchInput.removeEventListener("focus", handleFocus);
      }
    };
  }, []);

  // Fetch options based on search term
  useEffect(() => {
    const filteredOptions = materiel.filter(o =>
      o.name.toLowerCase().includes(search.toLowerCase())
    );
    setOptions(filteredOptions);
  }, [search, materiel]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    nameSetter(e.target.value);
  }

  return (
    <div className="ml-4 mr-8">
      <div className="flex justify-center mt-8">
        <label className="w-full md:w-1/2 p-0 my-0 flex items-center gap-2 gap-y-0 border border-slate-300 rounded-t">
          <input
            type="text"
            className="grow p-2 focus:outline-none border-0"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            id="searchInput"
          />
          <button className="p-2 h-full rounded-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </label>
      </div>

      <div className="flex justify-center align-top my-0 relative md:mx-0">
        <ul
          id="autoComplete"
          className={`bg-white list-none text-left w-full md:w-1/2 border z-20 border-t-0 border-slate-300 rounded-b m-0 absolute ${options.length === 0 ? 'hidden' : ''} ${search.length === 0 ? 'hidden' : ''}`}
        >
          {options.map((o) => (
            <li key={o.id} className="p-2 hover:bg-slate-300">
              <Link to={`/RT/${o.id}`} className="w-full block text-left">
                {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RtSearchBar;
