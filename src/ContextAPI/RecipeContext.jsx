import React, { createContext, useState, useContext } from 'react';

const RecipeContext = createContext();

//Custom hook
export const useRecipe = () => useContext(RecipeContext);

//children: Recipes.jsx
//Defining state variables here
export const RecipeProvider = ({ children }) => {
    const [dietSuggestions, setDietSuggestions] = useState([]);
    const [selectedDiet, setSelectedDiet] = useState('');

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
