import { useEffect, useState } from "react"
import MaterialItem from "./MaterialItem"
import materiel from "@/temp/materiel";

function MaterialList() {


  const [options, setOptions] = useState([] as { name: string, description: string, category: string }[])
  useEffect(() => {
    setOptions(materiel)
  }, [])



  return (
    <div className="flex-[5] card-body flex flex-row flex-wrap p-0 mx-4 md:m-0 gap-x-6 gap-y-3" >
      {options.map((m, i: number) => {
        return (
          <MaterialItem
            key={i}
            title={m.name}
            description={m.description}
            category={m.category}
          />
        )
      })}
    </div>


  )
}

export default MaterialList
