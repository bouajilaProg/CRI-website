import MaterialItem from "./MaterialItem";

// Define the type for each material item
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



// Define the props type for the MaterialList component
interface MaterialListProps {
  materials: Materiel[];
}

function MaterialList({ materials }: MaterialListProps) {
  return (
    <div className="flex-[5] card-body flex h-full flex-row flex-wrap p-0 mx-4 md:m-0 gap-x-6 gap-y-3">
      {materials.map((m, i: number) => (
        <MaterialItem
          key={i}
          title={m.materiel_name}
          description={m.description}
          category={m.category_name}
          link={m.materiel_id.toString()}
        />
      ))}
    </div>
  );
}

export default MaterialList;
