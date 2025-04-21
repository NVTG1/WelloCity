import React, { createContext, useState, useContext } from 'react';

// Creating a context
const ExercisesContext = createContext();

// Custom hook to use the ExercisesContext directly
export const useExercises = () => {
    return useContext(ExercisesContext);
};

// Provider component
// children: Exercises Component
export const ExercisesProvider = ({ children }) => {
    // Initializing the state variables using useState globally
    const [exerciseSuggestions, setExerciseSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState('');  // Managing the selectedExercise

    // Fetching exercises based on the body part
    // type: body part name
    const fetchExercises = async (type) => {
        const ApiKey = import.meta.env.VITE_API_KEY_Exercises;
        const apiKey = 'cc65018371msh27356ce58896615p1ebc2djsn88b4e9e7967b'; 
        
        // Fetches 6 exercises of the body part selected
        const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${type}?limit=6`;

        setLoading(true);
        try 
        {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
                },
            });

            const data = await response.json();
            if (data.length > 0) {
                setExerciseSuggestions(data);
            } else {
                setExerciseSuggestions([]);
            }

            setLoading(false);
        } 

        catch (error) 
        {
            console.error('Error fetching exercise data:', error);
            setExerciseSuggestions([]);
        }
    };

    return (

        //Everything returned can be used by the children wrapped inside
        <ExercisesContext.Provider
            value={{
                exerciseSuggestions,    
                selectedExercise,       
                setSelectedExercise,
                fetchExercises,
            }}
        >
            {children}
        </ExercisesContext.Provider>
    );
};
