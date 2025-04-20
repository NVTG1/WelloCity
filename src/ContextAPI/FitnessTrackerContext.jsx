import React, { createContext, useContext, useState, useEffect } from 'react';

const FitnessTrackerContext = createContext();

export const useFitnessTracker = () => useContext(FitnessTrackerContext);

// Replace with your actual YouTube API key
const YT_KEY = 'AIzaSyBq5kyPvRL21mhEip1YGkE1IPOA27bC-YA';

export const FitnessTrackerProvider = ({ children }) => {
    const [progressData, setProgressData] = useState({
        labels: ["week1", "week2", "week3", "week4"],
        workout: [0, 0, 0, 0],
        yoga: [0, 0, 0, 0],
        calories: [0, 0, 0, 0],
    });

    const [youtubeQuery, setYoutubeQuery] = useState('');
    const [videoResults, setVideoResults] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('progressData'));
        if (saved) setProgressData(saved);
    }, []);

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

    const fetchYogaVideos = async () => {
        if (!youtubeQuery) return alert("Please enter a yoga style.");

        const q = `${youtubeQuery} yoga`;
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&maxResults=5&key=${YT_KEY}`;

        try {
            const res = await fetch(url);
            const data = await res.json();

            const videos = (data.items || []).filter((item) => {
                const title = item.snippet.title.toLowerCase();
                const desc = item.snippet.description.toLowerCase();
                return title.includes("yoga") || desc.includes("yoga");
            });

            setVideoResults(videos);
        } catch (err) {
            console.error("YouTube fetch error", err);
        }
    };

    return (
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
