import { useState } from "react"

function MainNav() {

  const [authed, setAuthed] = useState<number>(1)

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
            <li><a href="#">RT page</a></li>
            <li><a href="#order">Order</a></li>
            <li><a href="contact">Contact (comming soon)</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">CRI</a>
      </div>

      {
        (authed == 1) ?
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><a>RT page</a></li>
              <li><a>Order</a></li>
            </ul>
          </div>
          : ""}


      <div className="navbar-end gap-3">
        {(authed == 1) ?
          <a className="btn">Profile</a>
          :
          <a className="btn">Log in</a>

        }
      </div>
    </div>
  )
}

export default MainNav
