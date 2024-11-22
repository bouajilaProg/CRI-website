import { Link } from "react-router-dom";

interface MaterialItemProps {
  title: string;
  description: string;
  category: string;
  link: string;
}

function MaterialItem(MaterialItemDetails: MaterialItemProps) {
  return (
    <Link to={"./" + MaterialItemDetails.link} className="w-[46%] md:w-auto">
      <div className="card card-compact p-0 m-0 bg-base-100 md:w-48 shadow-xl ">
        <figure>
          <img
            src="../../../public/MaterialsPhoto/cri big rt image.png"
            alt="Shoes" />
        </figure>
        <div className=" card-body">
          <h2 className="card-title truncate ">{MaterialItemDetails.title}</h2>
          <p className="text-wrap truncate line-clamp-3 ">{MaterialItemDetails.description}</p>
          <div className="card-actions flex justify-around">
            <div className="badge badge-outline">{MaterialItemDetails.category}</div>
            <div className="badge badge-accent badge-outline">available</div>
          </div>
        </div>

      </div>
    </Link>)
}

export default MaterialItem
