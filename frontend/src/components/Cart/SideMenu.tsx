import axios from "axios";
import { useState } from "react";


type CartRequest = {
  orderid: number,
  begin_date: Date,
  return_date: Date,
  reason: string
}


function SideMenu({ orderid }: { orderid: number }) {

  const [cartRequest, setCartRequest] = useState<CartRequest>({
    orderid: orderid,
    begin_date: new Date(),
    return_date: new Date(),
    reason: "temp"
  })


  function handleSubmit(e: any) {
    e.preventDefault();
    const OrderDate = e.target.OrderDate.value;
    const ReturnDate = e.target.ReturnDate.value;
    const reason = e.target.reason.value;

    if (!OrderDate || !ReturnDate || !reason) {
      alert('Please fill all the fields');
    } else if (new Date(OrderDate).getTime() > new Date(ReturnDate).getTime()) {
      alert('Order date cannot be greater than return date');
    } else {
      // Create a local cartRequest object
      const updatedCartRequest = {
        orderid: orderid,
        begin_date: new Date(OrderDate),
        return_date: new Date(ReturnDate),
        reason: reason,
      };

      // Update state with the new cart request
      setCartRequest(updatedCartRequest);

      console.log({ ...updatedCartRequest, orderid: orderid });

      // Send the updated cartRequest in the axios call
      axios.put('http://localhost:4000/order/send', { ...updatedCartRequest, orderid: orderid })
        .then(res => {
          if (res.data.success) {
            alert('Order sent successfully');
          }
        })
        .catch(err => {
          alert('Something went wrong');
          console.log(err);
        });
    }
  }

  return (
    <div className='flex-1 shadow-black '>
      <div className='card card-side bg-base-100 rounded-none border-b my-2 sm:w-full '>
        <form className='card-body' onSubmit={handleSubmit}>
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-4xl font-semibold text-white drop-shadow-lg">send</h2>
          </div>
          <label htmlFor="OrderDate">Order Date</label>
          <input type="date" name='OrderDate' className="input input-bordered" placeholder="date" />
          <label htmlFor="returnDate">Return Date</label>
          <input type="date" name='ReturnDate' className="input input-bordered" placeholder="date" />
          <label htmlFor="reason">Reason of order</label>
          <textarea name='reason' className="textarea h-24 textarea-bordered" placeholder="Reason of order"></textarea>
          <button className="btn">Send</button>
        </form>
      </div>
    </div>
  )
}

export default SideMenu
