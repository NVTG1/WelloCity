import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating a new context
const FitnessTrackerContext = createContext();

// Custom Hook to use the FitnessTrackerContext directly
export const useFitnessTracker = () => useContext(FitnessTrackerContext);

const yT_KEY = import.meta.env.VITE_API_KEY_Youtube;
const YT_KEY = "AIzaSyBNz-On1zN2dl3dVXvsHGrWLfCISZe1hgw";

//children: FitnessTracker 
// Initializing the state variables using useState
export const FitnessTrackerProvider = ({ children }) => {
    const [progressData, setProgressData] = useState({
        labels: ["week1", "week2", "week3", "week4"],
        workout: [0, 0, 0, 0],
        yoga: [0, 0, 0, 0],
        calories: [0, 0, 0, 0],
    });

    const [youtubeQuery, setYoutubeQuery] = useState('');
    const [videoResults, setVideoResults] = useState([]);

    // It checks if there is data present in the local storage, if there is, it sets it to progress data.
    // This ensures that data is not refreshed when the page reloads
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('progressData'));
        if (saved) setProgressData(saved);
    }, []);

    // Checks the index of the entered week, update the datasets accordingly and saves that data to both state variable and local storage
    const updateProgress = (weekInput, workout, yoga, calories) => {
        const updated = { ...progressData };
        const index = updated.labels.indexOf(weekInput);

        if (index !== -1) {
            updated.workout[index] = parseInt(workout);
            updated.yoga[index] = parseInt(yoga);
            updated.calories[index] = parseInt(calories);
            setProgressData(updated);
            localStorage.setItem('progressData', JSON.stringify(updated));
        }
    };

    // Resets all the datasets values and also of local storage
    const resetProgress = () => {
        const resetData = {
            labels: ["week1", "week2", "week3", "week4"],
            workout: [0, 0, 0, 0],
            yoga: [0, 0, 0, 0],
            calories: [0, 0, 0, 0],
        };
        setProgressData(resetData);
        localStorage.setItem('progressData', JSON.stringify(resetData));
    };

    // Fetching Youtube Videos according to the input given by the user
    const fetchYogaVideos = async () => {
        if (!youtubeQuery) return alert("Please enter a yoga style.");

        const q = `${youtubeQuery} yoga`;
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&maxResults=6&key=${YT_KEY}`;

        try {
            const res = await fetch(url);
            const data = await res.json();

            const videos = (data.items || []).filter((item) => {
                // Gives the title of video
                const title = item.snippet.title.toLowerCase();
                // Gives the description of video
                const desc = item.snippet.description.toLowerCase();
                // Checking if the title and description includes "yoga" or not
                return title.includes("yoga") || desc.includes("yoga");
            });
            setVideoResults(videos);
        }
        catch (err) {
            console.error("YouTube fetch error", err);
        }
    };

    return (

        //Everything returned can be used by the children wrapped inside
        <FitnessTrackerContext.Provider
            value={{
                progressData,
                updateProgress,
                resetProgress,
                youtubeQuery,
                setYoutubeQuery,
                fetchYogaVideos,
                videoResults,
            }}
        >
            {children}
        </FitnessTrackerContext.Provider>
    );
};
