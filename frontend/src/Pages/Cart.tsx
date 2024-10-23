import CartList from '@/components/Cart/CartList';
import SideMenu from '@/components/Cart/SideMenu';
import getUserId from '@/utils/UserManager';
import axios from 'axios';
import { useEffect, useState } from 'react';

// Updated CartItem type to include materialId
type CartItem = {
  materialId: number; // Add materialId here
  materielName: string;
  description: string; // Corrected spelling from "desciption" to "description"
  qte: number;
};

type t_cart = {
  orderid: number;
  orderItems: CartItem[];
};

function Cart() {
  const [cart, setCart] = useState<t_cart>({
    orderid: 0,
    orderItems: [],
  });

  async function fetchData() {
    try {
      // get orderid
      const orderid = (await axios.get(`http://localhost:4000/order/current?userid=${getUserId()}`)).data.order_id;
      console.log(orderid);

      // get order items
      const orderItemsRequest = await axios.get(`http://localhost:4000/order/cart/list/${orderid}`);
      const orderItems: CartItem[] = orderItemsRequest.data.map((item: any) => ({
        materialId: item.materiel_id, // Extract material_id from API response
        materielName: item.materiel_name,
        description: item.description, // Corrected spelling
        qte: item.qte,
      }));

      // update cart once after getting both orderid and orderItems
      setCart({
        orderid,
        orderItems,
      });

      console.log('Order Items:', orderItems);
      console.log('Order ID:', orderid);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  //if empty Cart
  if (cart.orderItems.length === 0) {
    return (
      <div>
        <h1 className="text-center text-4xl">empty Order List</h1>
      </div>
    );
  }


  return (
    <div>
      <h1 className="text-center text-4xl">Order List</h1>
      <div className="flex justify-between flex-col md:flex-row gap-4 m-16">
        <CartList materielList={cart.orderItems} />
        <SideMenu orderid={cart.orderid} />
      </div>
    </div>
  );
}

export default Cart;
