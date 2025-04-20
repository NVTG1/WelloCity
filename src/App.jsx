import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import { ExercisesProvider } from './ContextAPI/ExercisesContext';
import { RecipeProvider } from './ContextAPI/RecipeContext';
import { FitnessTrackerProvider } from './ContextAPI/FitnessTrackerContext';

// Lazy loading all components
const Home = lazy(() => import('./components/Home'));
const ContactUs = lazy(() => import('./components/ContactUs'));
const Recipes = lazy(() => import('./components/Recipes'));
const Exercises = lazy(() => import('./components/Exercises'));
const FitnessTracker = lazy(() => import('./components/FitnessTracker'));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        {/* Suspense for lazy-loaded components */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>

            <Route path="/" element={<Home />} />

            {/**Wrapping Recipes component in Context Provider*/}
            <Route path="/recipes" element={
              <RecipeProvider>
                <Recipes />
              </RecipeProvider>} />

            <Route path="/contactUs" element={<ContactUs />} />

            {/**Wrapping Exercise component in Context Provider*/}
            <Route path="/exercises" element={
              <ExercisesProvider>
                <Exercises />
              </ExercisesProvider>}
            />

            {/**Wrapping FitnessTracker component in Context Provider*/}
            <Route path="/fitnessTracker" element={
              <FitnessTrackerProvider>
                <FitnessTracker />
              </FitnessTrackerProvider>} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
