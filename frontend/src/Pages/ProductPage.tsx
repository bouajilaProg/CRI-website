import RtSearchBar from '@/components/RT/RtSearchBar'
import { IoIosRemoveCircleOutline } from "react-icons/io";

function ProductPage() {
  return (
    <>
      <RtSearchBar />
      <div className="h-16"></div>

      <div className="flex justify-center mx-4">
        <div className="card lg:card-side bg-base-100 shadow-xl lg:w-[70%]">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
              alt="Album" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-center w-full "> <span className="mb-1">arduino Uno </span>              <div className="badge badge-outline">microcontroller</div>
            </h2>
            <p><div className='flex gap-2'>
            </div>
              arduino uno is a microcontroller</p>

            <div className="sm:mt-2  card-actions justify-center lg:justify-end">

              <button className="btn  text-3xl"><IoIosRemoveCircleOutline /></button>
              <input type="text" placeholder="0" className="input input-bordered max-w-16 text-center " />
              <button className="btn  text-3xl">+</button>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default ProductPage
