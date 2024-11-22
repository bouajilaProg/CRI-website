import OrderItem from "@/components/Profile/OrderItem";
import getUserId from "@/utils/UserManager";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ProfileData = {
  user: string;
  orders: {
    beginDate: string;
    returnDate: string;
    status: string;
    items: { name: string; quantity: number }[];
  }[];
};

function Profile() {
  const defaultProfileData: ProfileData = {
    user: "",
    orders: [],
  };

  const [profileData, setProfileData] = useState<ProfileData>(
    defaultProfileData,
  );

  useEffect(() => {
    // Fetch orders from the server
    const fetchOrders = async () => {
      try {
        if (!getUserId()) {
          console.log("No user found");
          return;
        }

        const res = await axios.get(
          "http://localhost:4000/order/" + getUserId(),
        );
        console.log(res.data);

        if (res.data.length === 0) {
          console.log("no orders found");
          return;
        }

        const orders = res.data.map((order: any) => ({
          beginDate: order.orderData.begin_date,
          returnDate: order.orderData.return_date,
          status: order.orderData.order_state,
          items: order.items.map((item: any) => ({
            name: item.materiel_id,
            quantity: item.qte,
          })),
        }));

        setProfileData({ user: getUserId(), orders });
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col min-h-screen justify-start mt-40 mx-8 md:mx-16">
      <h3 className="text-2xl">My Orders</h3>

      {profileData.orders.map((order, index) => (
        <>
          <OrderItem
            key={index}
            beginDate={order.beginDate}
            returnDate={order.returnDate}
            status={order.status}
            items={order.items}
          />
          <hr className="my-2" />
        </>
      ))}
    </div>
  );
}

export default Profile;
