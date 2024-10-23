import getUserId from "@/utils/UserManager";
import axios from "axios";
import { useEffect, useState } from "react"
import { IoIosAddCircleOutline, IoIosCheckmark, IoIosClose, IoIosRemoveCircleOutline } from "react-icons/io";


type orderItemType = {
  orderid: number;
  materielid: number;
  qte: number;
}

function ItemSetter({ materielId }: { materielId: number }) {

  const userId = getUserId();

  const [added, setAdded] = useState(false);
  const [orderItem, setOrderItem] = useState<orderItemType>({
    orderid: 0,
    materielid: 0,
    qte: 0
  })

  const [itemCounter, setItemCounter] = useState(0);
  const [editMode, setEditMode] = useState(false);

  async function fetchData() {
    try {

      //fetch orderid
      let orderid = 0;
      const currentRes = await axios.get("http://localhost:4000/order/current?userid=" + userId)

      //create new order if not exists
      if (!currentRes.data) {
        await axios.post("http://localhost:4000/order/new", {
          userid: userId
        })
        console.log("order createed")

        const newCurrentRes = await axios.get("http://localhost:4000/order/current?userid=" + userId);
        orderid = newCurrentRes.data.order_id
      } else {

        orderid = currentRes.data.order_id;
      }

      //fetch qte
      let qte = 0;

      //fetch qte
      console.log("http://localhost:4000/order/orderItem?currentOrder=" + orderid + "&materiel=" + materielId)
      const res = await axios.get("http://localhost:4000/order/orderItem?currentOrder=" + orderid + "&materiel=" + materielId)

      if (res.data.length === 0) {
        qte = 1;
        setAdded(false)
      } else {
        qte = res.data.qte;
        setAdded(true)
      }


      setOrderItem({
        orderid: orderid,
        materielid: materielId,
        qte: qte
      });

      setItemCounter(qte);
    } catch (err) {
      console.warn(err)
    }
  }


  //on mount fetch data
  useEffect(() => {
    fetchData();
  }, [materielId]);


  function updater(qte: number) {
    //update qte
    if (qte < 1) {
      axios.delete("http://localhost:4000/order/delete/" + orderItem.orderid + "/" + orderItem.materielid)
      setAdded(false)
    }
    axios.put("http://localhost:4000/order/update", {
      orderid: orderItem.orderid,
      materielid: orderItem.materielid,
      qte: qte
    }).then(_ => {
      console.log("updated");
    }).catch(err => {
      console.warn(err);
    });
  }

  if (!added) {
    return (
      <div className="sm:mt-2  card-actions justify-center lg:justify-end">

        <button className="btn  text-3xl" onClick={() => {
          setAdded(true);
          console.log(orderItem)
          axios.post("http://localhost:4000/order/add", orderItem)
          setItemCounter(1);

        }} >add to order</button>
      </div>
    )
  }

  return (
    <div className="sm:mt-2  card-actions justify-center lg:justify-end">
      {!editMode ?
        <button className="btn  text-3xl" onClick={
          () => {
            setItemCounter(itemCounter - 1);
            updater(itemCounter - 1)
          }
        }>
          <IoIosRemoveCircleOutline />
        </button>
        :
        <button className="btn  text-3xl btn-outline btn-error" >
          <IoIosClose onClick={
            () => {
              setEditMode(false);
              setItemCounter(orderItem.qte)
            }
          } />
        </button>
      }

      <input type="text" className="input input-bordered max-w-16 text-center" onChange={(e) => setItemCounter(parseInt(e.target.value))} onFocus={() => setEditMode(true)} value={isNaN(itemCounter) ? 0 : itemCounter} />

      {!editMode ?
        <button className="btn  text-3xl" onClick={
          () => {
            setItemCounter(itemCounter + 1);
            updater(itemCounter + 1)
          }}>
          <IoIosAddCircleOutline />
        </button>
        :
        <button className="btn  text-3xl btn-outline btn-success" >
          <IoIosCheckmark onClick={() => {
            setEditMode(false);
            updater(itemCounter);
          }} />
        </button>}


    </div>
  )
}

export default ItemSetter
