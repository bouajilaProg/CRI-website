import { Link } from "react-router-dom"

function ErrorPage() {
  return (
    <div className="flex flex-col justify-center h-screen">
      <h1 className="text-4xl lg:text-8xl text-center">Page Not Found</h1>
      <p className="text-center text-2xl mt-4 mx-3">Sorry, the page you are looking for does not exist</p>
      <div className="flex justify-center mt-8">
        <Link className=" btn" to="/">Go back to home</Link>
      </div>
    </div>
  )
}

export default ErrorPage
