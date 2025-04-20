import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context for wellness tips and workout challenges
const TipsAndChallengesContext = createContext();

// Custom Hook to use the TipsAndChallengesContext directly
export const useTipsAndChallenges = () => useContext(TipsAndChallengesContext);

// Context Provider Component
export const TipsAndChallengesProvider = ({ children }) => {
    //Initializing the state variables
    const [wellnessTips, setWellnessTips] = useState([]);
    const [workoutChallenges, setWorkoutChallenges] = useState([]);

    useEffect(() => {
        // Loading wellness tips from JSON file
        fetch("/src/JSON/WellnessTips.json")
            .then(res => res.json())
            .then(data => setWellnessTips(data))
            .catch(err => console.error("Failed to load wellness tips:", err));

        // Fetching workout challenges from JSON file
        fetch("/src/JSON/WorkoutChallenges.json")
            .then(res => res.json())
            .then(data => setWorkoutChallenges(data))
            .catch(err => console.error("Failed to load workout challenges:", err));
    }, []);

    return (
        <TipsAndChallengesContext.Provider value={{ wellnessTips, workoutChallenges }}>
            {children}
        </TipsAndChallengesContext.Provider>
    );
};
