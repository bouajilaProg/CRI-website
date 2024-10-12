import Footer from '@/components/commun/Footer'
import MainNav from '@/components/commun/MainNav'
import About from '@/components/Home/About'
import Axis from '@/components/Home/Axis'
import Faq from '@/components/Home/Faq'
import Hero from '@/components/Home/Hero'

function Home() {
  return (
    <>
      <MainNav />
      <Hero />
      <About />
      <hr className='w-3/4 mx-auto my-8' />
      <Axis />
      <hr className='w-3/4 mx-auto my-8' />
      <Faq />
      <hr className='w-3/4 mx-auto my-8' />
      <Footer />
    </>
  )
}

export default Home
