import Logo from './assets/Logo.png'
import './App.css'
import Background from './components/Background';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import ContactUs from './components/ContactUs'
import Recipes from './components/Recipes'
import Exercises from './components/Exercises';
import FitnessTracker from './components/FitnessTracker';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/exercises" element={<Exercises />}/>
          <Route path="/fitnessTracker" element={<FitnessTracker/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
