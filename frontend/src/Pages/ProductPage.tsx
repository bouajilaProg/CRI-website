import ItemSetter from '@/components/commun/ItemSetter';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Materiel = {
  materiel_id: number;
  materiel_name: string;
  category_qte: number;
  description: string;
  image_link: string;
  category_id: number;
  category_name_id: number;
  category_name: string;
};




function ProductPage() {



  const [materielData, setMaterielData] = useState<Materiel>({
    materiel_id: 0,
    materiel_name: "",
    category_qte: 0,
    description: "",
    image_link: "",
    category_id: 0,
    category_name_id: 0,
    category_name: "",
  });

  useEffect(() => {
    const materielId = location.pathname.split('/').pop();
    if (materielId) {
      axios.get(`http://localhost:4000/materiel/${materielId}`)
        .then(res => {
          if (res.data.length === 0) {
            console.log("pp data not found");
            throw new Error("No data found");
          }
          setMaterielData(res.data);
        })
        .catch(err => {
          console.warn(err);
        });
    }
  }, [location.pathname]);



  return (
    <>
      <div className="flex justify-center mx-4">
        <div className="card lg:card-side bg-base-100 shadow-xl lg:w-[70%]">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
              alt="Album" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-center w-full "> <span className="mb-1">{materielData.materiel_name} </span>
              <div className="badge badge-outline">{materielData.category_name}</div>
            </h2>
            <p><span className='flex gap-2'>
            </span> {materielData.description}
            </p>
            <ItemSetter materielId={materielData.materiel_id} />
          </div>
        </div>
      </div >
    </>
  )
}

export default ProductPage
