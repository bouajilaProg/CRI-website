import React, { useState } from 'react'
import { CiSquareRemove } from "react-icons/ci";

function CartItem() {
  const [itemCounter, setItemCounter] = useState(0)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemCounter(parseInt(e.target.value))
  }

  return (
    <div className="card card-side bg-base-100 rounded-none border-b my-2 sm:w-full ">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title inline-flex justify-between"> <span>Product text </span> <button className=" px-[8px] py-[2px] text-3xl hover:text-red-600"><CiSquareRemove /></button></h2>
        <p>product description</p>
        <div className="card-actions justify-end flex-nowrap">
          <button className="btn text-xl px-5 md:text-3xl" onClick={() => { setItemCounter(itemCounter - 1) }}>-</button>
          <input type="text" className="input input-bordered max-w-12 md:max-w-16 text-center  " onChange={handleChange} value={isNaN(itemCounter) ? "" : itemCounter} />
          <button className="btn text-xl md:text-3xl" onClick={() => {
            setItemCounter(itemCounter + 1)
          }}  >+</button>

        </div>
      </div>
    </div>
  )
}

export default CartItem
