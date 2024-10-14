import './App.css'
import Footer from './components/commun/Footer'
import MainNav from './components/commun/MainNav'

import Home from './Pages/Home'
import LoginPage from './Pages/LoginPage'
import ProductPage from './Pages/ProductPage'
import RTMain from './Pages/RTMain'


function App() {

  return (
    <div className='flex justify-between flex-col min-h-screen'>
      <MainNav />
      <LoginPage />
      <br />
      <Footer />

    </div>
  )
}

export default App
