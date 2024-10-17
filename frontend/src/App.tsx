import './App.css'
import Footer from './components/commun/Footer'
import MainNav from './components/commun/MainNav'

// Pages
import Home from './Pages/Home'
import LoginPage from './Pages/LoginPage'
import ProductPage from './Pages/ProductPage'
import Profile from './Pages/Profile'
import RTMain from './Pages/RTMain'
import Cart from './Pages/Cart'
import ErrorPage from './Pages/ErrorPage'

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

const Layout = () => {
  return (
    <div className='flex justify-between flex-col min-h-screen'>
      <MainNav />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
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
        path: "/order",
        element: <Cart />
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
