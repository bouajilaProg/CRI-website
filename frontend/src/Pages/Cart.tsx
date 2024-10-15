import CartList from '@/components/Cart/CartList'
import SideMenu from '@/components/Cart/SideMenu'
import React from 'react'

function Cart() {
  return (
    <div>
      <h1 className="text-center text-4xl">Cart</h1>
      <div className="flex justify-between flex-row md:flex-col gap-4 m-16 ">
        <CartList />
        <SideMenu />
      </div>
    </div>
  )
}

export default Cart
