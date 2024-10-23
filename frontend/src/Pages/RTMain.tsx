import FilterBar from "@/components/RT/FilterBar"
import MaterialList from "@/components/RT/MaterialList"
import RtSearchBar from "@/components/RT/RtSearchBar"
import getUserId from "@/utils/UserManager"
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
    availability: true
  })


  function nameSetter(name: string) {
    setFilters({ ...filters, name: name })
  }

  function categorySetter(category: string[]) {
    setFilters({ ...filters, category: category })
  }

  function availabilitySetter(availability: boolean) {
    setFilters({ ...filters, availability: availability })
  }


  //types
  type Materiel = {
    materiel_id: number;
    materiel_name: string;
    category_qte: number;
    description: string;
    image_link: string;
    category_id: number;
    category_name_id: number;
    category_name: string;
    materiel_qte: number;
  };


  const [categories, setCategories] = useState<string[]>([]);
  const [materielList, setMaterielList] = useState<Materiel[]>([]);

  async function onStart() {

    const res = await axios.get("http://localhost:4000/order/current?userid=" + getUserId())

    if (!res.data) {
      await axios.post("http://localhost:4000/order/new", { userid: getUserId() })
    } else {
      console.log("already have order")
    }

    await axios.get(`http://localhost:4000/materiel/search`)
      .then((res) => {
        console.log(res.data);
        setMaterielList(res.data.materiels);
        setCategories(res.data.categories);
      });
  }

  useEffect(() => {
    onStart()

  }, []); // Runs only on mount

  useEffect(() => {
    //TODO: fetch data from server
    axios.get("http://localhost:4000/materiel/search/" + filters.name).then((res) => {
      setCategories(res.data.categories);
      setMaterielList(res.data.materiels);
    })
  }, [filters.name])

  useEffect(() => {
    //TODO: fetch data from server
    const { category, availability } = filters;
    axios.get(`http://localhost:4000/materiel/search/` + filters.name).then((res) => {

      let materielList = res.data.materiels;
      if (category.length != 0) {
        materielList = materielList.filter((materiel: Materiel) => filters.category.includes(materiel.category_name));
      }

      if (availability == true) {
        materielList = materielList.filter((materiel: Materiel) => materiel.materiel_qte > 0);
      }

      setMaterielList(materielList);
    }
    )
  }, [filters.category, filters.availability])

  if (materielList.length == -3) {
    return (
      <>
        <RtSearchBar nameSetter={nameSetter} />
        <div className=""></div>
        <div className="flex flex-wrap sm:flex-row flex-col ">
          <h1 className="text-4xl text-center h-full w-full">No materiel found</h1>
        </div>
      </>
    )
  }

  return (
    <>
      <RtSearchBar nameSetter={nameSetter} />
      <div className="h-16"></div>
      <div className="flex flex-wrap sm:flex-row flex-col ">
        <FilterBar categorySetter={categorySetter} availabilitySetter={availabilitySetter} categories={categories} />
        <MaterialList materials={materielList} />
      </div>
    </>
  )
}

export default RTMain
