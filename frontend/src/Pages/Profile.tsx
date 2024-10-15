import { useEffect, useState } from "react";
import OrderItem from "./OrderItem";


interface ProfileData {
  user: string;

  orders: {
    date: string;
    status: number;
    items: { name: string, quantity: number }[]
  }[];
}


function Profile() {

  const defaultProfileData: ProfileData = {
    user: "",
    orders: []
  }

  const [profileData, setProfileData] = useState<ProfileData>(defaultProfileData)

  useEffect(() => {
    //TODO: Fetch orders from the server
    setProfileData({
      user: "John Doe",
      orders: [
        { date: "2021-09-01", status: 2, items: [{ name: "item1", quantity: 2 }, { name: "item2", quantity: 3 }] },
        { date: "2021-09-02", status: 0, items: [{ name: "item3", quantity: 1 }, { name: "item4", quantity: 2 }] },
        { date: "2021-09-03", status: 1, items: [{ name: "item5", quantity: 4 }, { name: "item6", quantity: 5 }] },
        { date: "2021-09-04", status: 3, items: [{ name: "item7", quantity: 6 }, { name: "item8", quantity: 7 }] },
        { date: "2021-09-05", status: 4, items: [{ name: "item9", quantity: 8 }, { name: "item10", quantity: 9 }] },
      ]
    })
  }
    , [])

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl my-8">Hello {profileData.user}</h1>
      <h3 className="text-2xl">My Orderers</h3>

      {(profileData.orders.length == 0) ? <p>No orders found</p> : profileData.orders.map((order, index) => (
        <>
          <OrderItem key={index} date={order.date} status={order.status} items={order.items} />

          <hr className="my-2" />
        </>
      ))}

    </div>
  )
}

export default Profile
