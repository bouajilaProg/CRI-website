import FilterBar from "@/components/RT/FilterBar"
import MaterialList from "@/components/RT/MaterialList"
import RtSearchBar from "@/components/RT/RtSearchBar"
import axios from "axios"
import { useEffect, useState } from "react"

interface Filters {
  name: string,
  category: string[],
  availability: boolean
}

function RTMain() {
  const [filters, setFilters] = useState<Filters>({
    name: "",
    category: [],
    availability: false
  })

  const [categories, setCategories] = useState([] as string[]);

  useEffect(() => {
    //TODO: fetch data from server
    axios.post("http://localhost:4000/materiel/search", filters).then((res) => {
      setCategories(res.data.rows);
    }
    ), [filters]
  })

  function nameSetter(name: string) {
    setFilters({ ...filters, name: name })
  }

  function categorySetter(category: string[]) {
    setFilters({ ...filters, category: category })
  }
  return (
    <>
      <RtSearchBar nameSetter={nameSetter} />
      <div className="h-16"></div>
      <div className="flex flex-wrap sm:flex-row flex-col ">
        <FilterBar categorySetter={categorySetter} categories={["hello"]} />
        <MaterialList />
      </div>
    </>
  )
}

export default RTMain
