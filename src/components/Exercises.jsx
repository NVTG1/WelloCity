import React, { useState } from 'react';
import { useExercises } from '../ContextAPI/ExercisesContext';

function Exercises() {
    const { exerciseSuggestions, fetchExercises, selectedExercise, setSelectedExercise } = useExercises();  //Using context values not useState as already managed by context

    // Handling selection
    const handleExerciseSelect = (e) => {
        setSelectedExercise(e.target.value);
    };

    // const fetchUserDiet = async (dietType) => {
    //     const apiKey = '32a8f96f9b1c4f489a8a80d4f51fc20e';
    //     const endpoint = https://api.spoonacular.com/recipes/complexSearch?diet=${dietType}&number=8&apiKey=${apiKey};

    //     try {
    //         const response = await fetch(endpoint);
    //         const data = await response.json();

    //         if (data.results && data.results.length > 0) {
    //             setDietSuggestions(data.results);
    //         } else {
    //             setDietSuggestions([]);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching diet data:', error);
    //         setDietSuggestions([]);
    //     }
    // };

    // Handling submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedExercise) {
            fetchExercises(selectedExercise);
        } else {
            alert('Please select a body part');
        }
    };

    return (
        <div className="bg-white min-h-screen px-6 py-4">
            <h1 className="text-5xl font-extrabold text-center text-black mb-6">Physical Health Exercises</h1>

            {/* Selecting body part */}
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-8">
                <label className="block text-lg font-semibold text-gray-700 mb-2">Select Body Part</label>
                <select
                    id="exerciseType"
                    value={selectedExercise}
                    onChange={handleExerciseSelect}
                    className="w-full px-4 py-2 border rounded-md"
                >
                    <option value="">-- Choose a body part --</option>
                    <option value="back">Back</option>
                    <option value="chest">Chest</option>
                    <option value="lower legs">Lower Legs</option>
                    <option value="upper legs">Upper Legs</option>
                    <option value="arms">Arms</option>
                    <option value="shoulders">Shoulders</option>
                    <option value="cardio">Cardio</option>
                </select>

                <div className="text-center mt-4">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-green-600 text-white rounded-md font-bold hover:bg-green-700"
                    >
                        Get Exercises
                    </button>
                </div>
            </form>

            {/* Display exercise suggestions */}

            {/*Checking if the array has elemts or not*/}
            {exerciseSuggestions.length > 0 ? (
                // grid-cols-1: 1 column by default, md:grid-cols-2: 2 column on medium screens and lg:grid-cols-3: 3 colums on large screen
                <div id="exerciseSuggestions" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exerciseSuggestions.map((exercise, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-md shadow-lg">
                            <h3 className="text-xl font-semibold capitalize">{exercise.name}</h3>
                            <p className="mt-2">
                                <strong>Target Muscle:</strong> {exercise.target}
                            </p>
                            <img
                            //If exercise doesn't have any gif, we display the default placeholder image
                                src={exercise.gifUrl || 'https://via.placeholder.com/200x200.png?text=No+Image+Available'} 
                                alt={exercise.name}
                                className="w-full h-48 object-contain mt-4"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                // If the array contains no elements
                <p>No exercises found for this body part. Please try another one.</p>
            )}
        </div>
    );
}

export default Exercises;
