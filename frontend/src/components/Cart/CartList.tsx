import React from 'react'
import CartItem from './CartItem'

function CartList() {
  return (
    <div className="sm:flex-[7] md:flex-[5]">
      <div>
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
    </div>
  )
}

export default CartList
