import React, { Suspense, lazy } from 'react';
import './App.css';
import Logo from './assets/Logo.png';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import { ExercisesProvider } from './ContextAPI/ExercisesContext';
import { RecipeProvider } from './ContextAPI/RecipeContext';

// Lazy loading all components
const Home = lazy(() => import('./components/Home'));
const ContactUs = lazy(() => import('./components/ContactUs'));
const Recipes = lazy(() => import('./components/Recipes'));
const Exercises = lazy(() => import('./components/Exercises'));
const FitnessTracker = lazy(() => import('./components/FitnessTracker'));
const Background = lazy(() => import('./components/Background'));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        {/* Suspense for lazy-loaded components */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/recipes" element={<RecipeProvider>
              <Recipes />
            </RecipeProvider>} />

            <Route path="/contactUs" element={<ContactUs />} />

            <Route path="/exercises" element={
              <ExercisesProvider>
                <Exercises />
              </ExercisesProvider>}
            />

            <Route path="/fitnessTracker" element={<FitnessTracker />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
