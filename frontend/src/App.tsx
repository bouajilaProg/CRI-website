import './App.css'
import Footer from './components/commun/Footer'
import MainNav from './components/commun/MainNav'

//pages
import Home from './Pages/Home'
import LoginPage from './Pages/LoginPage'
import ProductPage from './Pages/ProductPage'
import Profile from './Pages/Profile'
import RTMain from './Pages/RTMain'


function App() {

  return (
    <div className='flex justify-between flex-col min-h-screen'>
      <MainNav />
      <Profile />
      <br />
      <Footer />

    </div>
  )
}

export default App
