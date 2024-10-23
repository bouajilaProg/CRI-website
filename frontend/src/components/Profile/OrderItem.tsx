import Badge from "./Badge";
import { IoIosArrowRoundForward } from "react-icons/io";


interface OrderItemProps {
  beginDate: string,
  returnDate: string,
  status: string;
  items: { name: string, quantity: number }[];
}

// 0 status pending
// 1 status accepted
// 2  status Delivered
// 3 status refused
// 4 status returned


function OrderItem({ beginDate, returnDate, status, items }: OrderItemProps) {
  return (
    <div>
      <div className="collapse collapse-arrow">
        <input type="checkbox" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium inline-flex">
          <span className="mr-2">{new Date(beginDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
          })}</span>
          <span className="mr-2"><IoIosArrowRoundForward /></span>
          <span>{new Date(returnDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
          })}</span>
          <span className="mb-2 ml-2">

            <Badge status={status} />
          </span>
        </div>
        <div className="collapse-content flex flex-col">


          {items.map((item, index) => (
            <>
              <div key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.quantity}</span>
              </div>
              <hr className="my-2" />
            </>
          ))
          }


        </div>
      </div>
    </div >
  )
}

export default OrderItem
