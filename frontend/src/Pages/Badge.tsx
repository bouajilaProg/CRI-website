// 0 status pending
// 1 status accepted
// 2  status Delivered
// 3 status refused
// 4 status returned


function Badge({ status }: { status: number }) {

  if (status === 0) {
    return <span className="badge badge-secondary text-white">Pending</span>
  } else if (status === 1) {
    return <span className="badge badge-primary text-white">Accepted</span>
  } else if (status === 2) {
    return <span className="badge badge-success text-white">Delivered</span>
  } else if (status === 3) {
    return <span className="badge badge-error text-white">Refused</span>
  } else if (status === 4) {
    return <span className="badge badge-warning text-white">Returned</span>
  }



}

export default Badge 
