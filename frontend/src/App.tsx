import './App.css'
import Footer from './components/commun/Footer'
import MainNav from './components/commun/MainNav'

//pages
import Home from './Pages/Home'
import LoginPage from './Pages/LoginPage'
import ProductPage from './Pages/ProductPage'
import Profile from './Pages/Profile'
import RTMain from './Pages/RTMain'
import Cart from './Pages/Cart'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './Pages/ErrorPage'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/RT",
    element: <RTMain />,
  },
  {
    path: "RT/:id",
    element: <ProductPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "*",
    element: <ErrorPage />,
  }


])


function App() {

  return (
    <div className='flex justify-between flex-col min-h-screen'>
      <MainNav />

      <RouterProvider router={router} />
      <br />
      <Footer />

    </div>
  )
}

export default App
