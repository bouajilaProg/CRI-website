

/*interface RtSearchBarProps {
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}*/

import materiel from "../../temp/materiel"
import { useEffect, useState } from "react"


function RtSearchBar() {
  const [search, setSearch] = useState("")
  let options: string[] = []

  useEffect(() => {
    let SearchInput: HTMLInputElement;
    options = materiel.map(m => m.name)
    try {
      SearchInput = document.querySelector("#searchInput") as HTMLInputElement;
      SearchInput.addEventListener("blur", () => {
        const autoComplete = document.querySelector("#autoComplete") as HTMLUListElement;
        autoComplete.classList.add("hidden")
      })
      SearchInput.addEventListener("focus", () => {
        const autoComplete = document.querySelector("#autoComplete") as HTMLUListElement;
        autoComplete.classList.remove("hidden")
      })
    } catch (e) {
      console.log(e)
    }
    return () => {
      SearchInput.removeEventListener("blur", () => { })
      SearchInput.removeEventListener("focus", () => { })
        , []

    }
  })

  //TODO: the search refetch data only if the search term is different from the previous one
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.includes(search) == false) {
      //fetch data
      options = materiel.map(m => m.name).filter(o => o.includes(search))
    }
    setSearch(e.target.value)
  }

  options = materiel.map(m => m.name).filter(o => o.includes(search))
  if (search === "") {
    options = []
  }
  console.log(options)

  return (
    <>
      <div className="flex justify-center mt-8  ">
        <label className=" w-full md:w-1/2 ml-4 mr-8 p-0 my-0 flex items-center gap-2 gap-y-0 border border-slate-300 rounded-t">
          <input type="text" className="grow p-2  focus:outline-none border-0" placeholder="Search" value={search} onChange={handleSearch} id="searchInput" />
          <button className=" p-2 h-full rounded-xs ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>

          </button>
        </label>
      </div>

      <div className="flex justify-center align-top my-0 relative mx-8 md:mx-0">
        <ul id="autoComplete" className={"bg-white list-none text-left w-full md:w-1/2 border z-20 border-t-0 border-slate-300 rounded-b m-0 absolute "} >
          {options.map((o, i) => (
            <li key={i} className="p-2 hover:bg-slate-300"><button className="w-full text-left">{o}</button></li>
          ))}
        </ul>
      </div >
    </>
  )
}

export default RtSearchBar
