import React, { createContext, useState, useContext } from 'react';

// Global state container for Recipes
const RecipeContext = createContext();

// Custom Hook to use the Recipes directly
export const useRecipe = () => useContext(RecipeContext);

// children: Recipes.jsx
// Initializing state variables using useState
export const RecipeProvider = ({ children }) => {
    const [dietSuggestions, setDietSuggestions] = useState([]);
    const [selectedDiet, setSelectedDiet] = useState('');

    //Fetching Recipes from Spoonacular API
    const fetchUserDiet = async (dietType) => {
        const apiKey = "25bf6946922949898c0ff96581051502";
        const endpoint = `https://api.spoonacular.com/recipes/complexSearch?diet=${dietType}&number=8&apiKey=${apiKey}`;

        try {
            const response = await fetch(endpoint);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                setDietSuggestions(data.results);
            } else {
                setDietSuggestions([]);
            }
        } catch (error) {
            console.error('Error fetching diet data:', error);
            setDietSuggestions([]);
        }
    };

    return (

        //Everything returned can be used by the children wrapped inside
        <RecipeContext.Provider
            value={{
                dietSuggestions,
                selectedDiet,
                setSelectedDiet,
                fetchUserDiet,
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
};
