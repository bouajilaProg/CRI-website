// 0 status pending
// 1 status accepted
// 2  status Delivered
// 3 status refused
// 4 status returned


function Badge({ status }: { status: string }) {

  if (status === "pending") {
    return <span className="badge badge-secondary text-white">Pending</span>
  } else if (status === "accepted") {
    return <span className="badge badge-primary text-white">Accepted</span>
  } else if (status === "delivered") {
    return <span className="badge badge-success text-white">Delivered</span>
  } else if (status === "refused") {
    return <span className="badge badge-error text-white">Refused</span>
  } else if (status === "returned") {
    return <span className="badge badge-warning text-white">Returned</span>
  }



}

export default Badge 
