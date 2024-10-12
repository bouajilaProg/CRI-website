import FilterBar from "@/components/RT/FilterBar"
import MaterialList from "@/components/RT/MaterialList"
import RtSearchBar from "@/components/RT/RtSearchBar"


function RTMain() {
  return (
    <>

      <RtSearchBar />
      <div className="h-16"></div>
      <div className="flex flex-wrap sm:flex-row flex-col ">
        <FilterBar />
        <MaterialList />
      </div>
    </>
  )
}

export default RTMain
