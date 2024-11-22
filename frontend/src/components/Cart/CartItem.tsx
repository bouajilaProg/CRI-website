import { useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import ItemSetter from "../commun/ItemSetter";
import axios from "axios";
import getUserId from "@/utils/UserManager";
import { useNavigate } from "react-router-dom";

// Updated t_cartItem type to include materialId
type t_cartItem = {
  materialId: number; // Add materialId here
  materielName: string;
  description: string; // Corrected spelling from "desciption" to "description"
  qte?: number;
};

function CartItem({ materialId, materielName, description }: t_cartItem) {
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className={"card card-side bg-base-100 rounded-none border-b w-full my-2 sm:w-full " +
        (hidden ? "hidden" : "")}
    >
      <figure className="sm:w-full md:w-96  lg:w-40 h-60 ">
        <img
          src="../../../public/MaterialsPhoto/cri cart image.png"
          alt="Item"
        />
      </figure>
      <div className="card-body w-fit">
        <h2 className="card-title inline-flex justify-between">
          <span>{materielName}</span>
          <button
            className="px-[8px] py-[2px] text-3xl hover:text-red-600"
            onClick={() => {
              setHidden(true);
              //delete materielId
              //
              axios.get(
                "http://localhost:4000/order/current?userid=" + getUserId(),
              ).then((newCurrentRes) => {
                const orderid = newCurrentRes.data.order_id;
                console.log(
                  "pp = http://localhost:4000/order/cart/list/" + orderid,
                );
                axios.delete(
                  "http://localhost:4000/order/delete/" + orderid + "/" +
                  materialId,
                ).then((_) => {
                  console.log("deleted");
                  navigate(0);
                }).catch((err) => {
                  console.warn(err);
                });
              });
            }}
          >
            <CiSquareRemove />
          </button>
        </h2>
        <p>{description}</p>
        <div className="flex-nowrap justify-end">
          <ItemSetter materielId={materialId} />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
