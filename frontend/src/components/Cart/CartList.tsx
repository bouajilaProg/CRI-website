import CartItem from './CartItem'

function CartList() {
  return (
    <div className="flex-[3]">
      <div>
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
    </div>
  )
}

export default CartList
