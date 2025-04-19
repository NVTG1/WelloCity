import Logo from './assets/Logo.png'
import './App.css'
import Background from './components/Background';
import Home from './components/Home';

function App() {
  return (
    <div className="h-screen w-full relative">
    
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        
        <img src={Logo} alt="Logo" className="w-16 h-auto" />
        
        <h1 className="text-black text-4xl font-bold">WelloCity</h1>
      </div>
      <Home />
    </div>
  );
}

export default App
