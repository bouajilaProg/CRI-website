import Badge from "./Badge";


interface OrderItemProps {
  date: string;
  status: number;
  items: { name: string, quantity: number }[];
}

// 0 status pending
// 1 status accepted
// 2  status Delivered
// 3 status refused
// 4 status returned


function OrderItem({ date, status, items }: OrderItemProps) {
  return (
    <div>
      <div className="collapse collapse-arrow">
        <input type="checkbox" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium"><span className="mr-2">{date}</span>
          <Badge status={status} />
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

          <div className="inline-flex justify-between w-full"><span>items</span> <span>5</span></div>

        </div>
      </div>
    </div >
  )
}

export default OrderItem
