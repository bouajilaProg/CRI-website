import RtSearchBar from './RtSearchBar'
import FilterBar from './FilterBar'

function RtBar() {
  return (
    <div>


      <div className=" bg-base-100 join-item text-black">
        <RtSearchBar />
      </div>


      <div>
        <FilterBar />
      </div>
    </div>
  )
}

export default RtBar
