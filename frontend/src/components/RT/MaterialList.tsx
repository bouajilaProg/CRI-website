import MaterialItem from "./MaterialItem"

function MaterialList() {
  return (
    <div className="flex-[3] card-body grid-cols-5 p-0 mx-4 md:m-0">
      <MaterialItem title="Pizza" description="Pizza description" />
    </div>

  )
}

export default MaterialList
