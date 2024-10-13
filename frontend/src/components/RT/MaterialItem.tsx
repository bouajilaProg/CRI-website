
interface MaterialItemProps {
  title: string;
  description: string;
  category: string;
}

function MaterialItem(MaterialItemDetails: MaterialItemProps) {
  return (
    <div className="w-[46%] md:w-auto">
      <div className="card card-compact p-0 m-0 bg-base-100 md:w-48 shadow-xl ">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
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
    </div>)
}

export default MaterialItem
