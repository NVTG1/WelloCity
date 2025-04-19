import Logo from './assets/Logo.png'
import './App.css'
import Background from './components/Background';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import ContactUs from './components/ContactUs'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/contactUs" element={<ContactUs/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
