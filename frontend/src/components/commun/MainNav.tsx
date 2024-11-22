import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function MainNav() {

  const reloader = useNavigate();
  const [authed, setAuthed] = useState<number>(0)

  useEffect(() => {
    localStorage.getItem("user_id") ? setAuthed(1) : setAuthed(0)
  }, [])



  //TODO: update the buttons based on the user's authentication status 
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white  z-[1]  w-52 p-2 shadow">
            <li><Link to="RT">RT page</Link></li>
            <li><Link to="puthy">Contact (coming soon)</Link></li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">CRI</Link>
      </div>

      {
        (authed == 1) ?
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><Link to="RT">RT page</Link></li>
              <li><Link to="Order">Order</Link></li>
              <li><Link to="puthy">Contact (coming soon)</Link></li>
            </ul>
          </div>
          : ""}


      <div className="navbar-end gap-3">
        {(authed == 1) ?
          <>

            <Link className="md:flex Cart btn" to={"/order"}>Cart</Link>
            <Link to="Profile" className="btn">Profile</Link>
          </>
          :
          <Link to="Login" className="btn">Log in</Link>

        }
      </div>
    </div>
  )
}

export default MainNav
