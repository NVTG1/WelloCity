import React, { createContext, useState, useContext } from 'react';

const ExercisesContext = createContext();

// Custom hook to use the context
export const useExercises = () => {
    return useContext(ExercisesContext);
};

// Create the provider component
//children: Exercises Component
export const ExercisesProvider = ({ children }) => {
    const [exerciseSuggestions, setExerciseSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState('');  // Managing the selectedExercise

    // Fetching exercises based on the body part
    const fetchExercises = async (type) => {
        const apiKey = 'cc65018371msh27356ce58896615p1ebc2djsn88b4e9e7967b';
        const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${type}?limit=8`;

        setLoading(true);
        try {
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
        } catch (error) {
            console.error('Error fetching exercise data:', error);
            setExerciseSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    return (
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
