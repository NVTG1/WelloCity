import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';  //Imported Chart form chart.js to render charts

const YT_KEY = 'AIzaSyBq5kyPvRL21mhEip1YGkE1IPOA27bC-YA'; // YouTube

const FitnessTracker = () => {
  const [progressData, setProgressData] = useState({  //Stores the data of 4 weeks for yoga, workout and calories
    labels: ["week1", "week2", "week3", "week4"],
    workout: [0, 0, 0, 0],
    yoga: [0, 0, 0, 0],
    calories: [0, 0, 0, 0],
  });

  const [filter, setFilter] = useState("all");
  const [videoResults, setVideoResults] = useState([]);

  //To access Charts.
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [weekInput, setWeekInput] = useState('');
  const [workoutInput, setWorkoutInput] = useState('');
  const [yogaInput, setYogaInput] = useState('');
  const [caloriesInput, setCaloriesInput] = useState('');

  const [youtubeQuery, setYoutubeQuery] = useState('');

  const filterMap = {
    workout: [0],
    yoga: [1],
    calories: [2],
    all: [0, 1, 2],
  };

  useEffect(() => {
    // Stores the data inside the browser's local storage in the form of String.
    // Which is then converted to an object by JSON.parse()
    const saved = JSON.parse(localStorage.getItem('progressData'));
    if (saved) setProgressData(saved);
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current.getContext('2d');  //Gets the 2D drawing context which is needed by Chart.js to draw the chart

      //3 data-sets, one for Workout, one for Yoga and one for Calories
      const datasetsMap = [
        {
          label: "Workout duration (min)",
          data: progressData.workout,
          backgroundColor: "#ff9ff3",
        },
        {
          label: "Yoga session (min)",
          data: progressData.yoga,
          backgroundColor: "#feca57",
        },
        {
          label: "Calories burned",
          data: progressData.calories,
          backgroundColor: "#1dd1a1",
        },
      ];

      //Filtering data according to the datasets or if "all" then all the datasets.
      const filteredDatasets =
        filter === "all"
          ? datasetsMap
          : [datasetsMap[filterMap[filter][0]]];

      //Constructs it into the type required by the chart    
      const allData = {
        labels: progressData.labels,
        datasets: filteredDatasets,
      };

      const chartConfig = {
        type: "bar",
        data: allData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 10,
              },
            },
            x: {
              type: 'category',
              labels: progressData.labels,
              ticks: {
                autoSkip: false,
              },
            },
          },
        },
      };

      //If previous chart exists, destroy it before creating a new one to avoid memory overflow
      if (chartInstance.current) chartInstance.current.destroy();
      chartInstance.current = new Chart(chart, chartConfig);
    }
  }, [progressData, filter]);

  // Updating and saving the entered data
  const handleUpdateProgress = () => {
    const validWeeks = ["week1", "week2", "week3", "week4"];
    //Checks if the week chosen is between week1 - week4 or not
    if (!validWeeks.includes(weekInput)) {
      alert("Please select a valid week (week1 - week4).");
      return;
    }

    //isNaN() checks if the input are not numbers
    if (isNaN(workoutInput) || isNaN(yogaInput) || isNaN(caloriesInput)) {
      alert("Please enter valid numeric values for workout, yoga, and calories.");
      return;
    }

    const updated = { ...progressData };
    const index = updated.labels.indexOf(weekInput);  //Stores the index of week to update the corresponding data

    //If index is found, the respective workout, yoga and calories are updated
    if (index !== -1) {
      updated.workout[index] = parseInt(workoutInput);
      updated.yoga[index] = parseInt(yogaInput);
      updated.calories[index] = parseInt(caloriesInput);
    }

    setProgressData(updated);
    localStorage.setItem('progressData', JSON.stringify(updated));  //Save the data in the local storage so that it persists even after reloading

    //Resetting the input fields
    setWeekInput('');
    setWorkoutInput('');
    setYogaInput('');
    setCaloriesInput('');
  };

  //Reset button function
  const handleResetProgress = () => {
    const resetData = {
      labels: ["week1", "week2", "week3", "week4"],
      workout: [0, 0, 0, 0],
      yoga: [0, 0, 0, 0],
      calories: [0, 0, 0, 0],
    };
    setProgressData(resetData);
    localStorage.setItem('progressData', JSON.stringify(resetData));
  };

  // For Recommended Yoga Videos
  const fetchYogaVideos = async () => {
    if (!youtubeQuery) return alert("Please enter a yoga style.");

    const q = `${youtubeQuery} yoga`;  //Building a search query
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&maxResults=5&key=${YT_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const videos = (data.items || []).filter((item) => {
        const title = item.snippet.title.toLowerCase();  //Gives title of video
        const desc = item.snippet.description.toLowerCase(); // Gives description of video
        return title.includes("yoga") || desc.includes("yoga"); //Checking if title and descrition includes "yoga" or not 
      });
      setVideoResults(videos);
    } catch (err) {
      console.error("Video fetch error", err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-12">
      <div className="flex justify-between items-center">

        {/* Progress Tracker */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Progress Tracker</h2>
          <div className="h-96">
            <canvas ref={chartRef}></canvas>
          </div>
          <select
            className="mt-2 p-2 border rounded"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="workout">Workout</option>
            <option value="yoga">Yoga</option>
            <option value="calories">Calories</option>
          </select>
          <div className="flex flex-col md:flex-row gap-2 mt-4">
            <select
              className="p-2 border rounded"
              value={weekInput}
              onChange={(e) => setWeekInput(e.target.value)}
            >
              <option value="">Select Week</option>
              <option value="week1">Week 1</option>
              <option value="week2">Week 2</option>
              <option value="week3">Week 3</option>
              <option value="week4">Week 4</option>
            </select>
            <input
              className="p-2 border rounded"
              placeholder="Workout (min)"
              value={workoutInput}
              onChange={(e) => setWorkoutInput(e.target.value)}
            />
            <input
              className="p-2 border rounded"
              placeholder="Yoga (min)"
              value={yogaInput}
              onChange={(e) => setYogaInput(e.target.value)}
            />
            <input
              className="p-2 border rounded"
              placeholder="Calories"
              value={caloriesInput}
              onChange={(e) => setCaloriesInput(e.target.value)}
            />
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleUpdateProgress}
            >
              Update
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={handleResetProgress}
            >
              Reset
            </button>
          </div>
        </section>

        {/* Yoga Search */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Yoga Videos</h2>
          <div className="flex flex-col md:flex-row gap-2 mb-4">
            <input
              className="p-2 border rounded"
              placeholder="Search Yoga Style"
              value={youtubeQuery}
              onChange={(e) => setYoutubeQuery(e.target.value)}
            />
            <button onClick={fetchYogaVideos} className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
              Search
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {videoResults.map((video) => (
              <div key={video.id.videoId} className="border p-4 rounded">

                {/**Displays the title */}
                <h4 className="font-semibold">{video.snippet.title}</h4>

                {/**Shows the video thumbnail */}
                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="w-full h-40 object-cover my-2" />

                {/**Takes us to the video in a new tab when the link is clicked */}
                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  Watch Video
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FitnessTracker;
