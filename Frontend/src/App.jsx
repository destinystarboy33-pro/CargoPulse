import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Home/Home'
import Footer from './Components/Footer'
import About from './Pages/About'
import Services from './Pages/Service'
import Tracking from './Pages/Tracking'

import './App.css'

function App() {
  

  return (
    <>
     <BrowserRouter>
     <Header />
     <Routes>

      <Route path='/' element={<Home />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/services' element={<Services />}></Route>
      <Route path='/tracking' element={<Tracking />}></Route>
     </Routes>

    <Footer />
     </BrowserRouter>
    </>
  )
}

export default App
