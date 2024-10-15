import CartList from '@/components/Cart/CartList'
import SideMenu from '@/components/Cart/SideMenu'

function Cart() {
  return (
    <div>
      <h1 className="text-center text-4xl">order List</h1>
      <div className="flex justify-between flex-col md:flex-row gap-4 m-16 ">
        <CartList />
        <SideMenu />
      </div>
    </div>
  )
}

export default Cart
