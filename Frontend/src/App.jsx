import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Home/Home'
import Footer from './Components/Footer'
import About from './Pages/About'
import Services from './Pages/Service'
import Tracking from './Pages/Tracking'
import Contact from './Pages/Contact'
import Pricing from './Pages/Pricing'
import ScrollToTop from './Components/ScrollToTop'

import './App.css'

function App() {
  

  return (
    <>
     <BrowserRouter>
     <ScrollToTop />
     <Header />
     <Routes>

      <Route path='/' element={<Home />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/services' element={<Services />}></Route>
      <Route path='/contact' element={<Contact />}></Route>
      <Route path='/tracking' element={<Tracking />}></Route>
      <Route path='/pricing' element={<Pricing />}></Route>
     </Routes>

    <Footer />
     </BrowserRouter>
    </>
  )
}

export default App
