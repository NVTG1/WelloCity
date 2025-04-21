import React from 'react';
import { useExercises } from '../ContextAPI/ExercisesContext';
import BackgroundImage from '../assets/Exercises.jpg'; 

function Exercises() {
    // We have already initialized the state variable globally inside the ExercisesContext.jsx, i.e, Context Provider
    const { exerciseSuggestions, fetchExercises, selectedExercise, setSelectedExercise } = useExercises();

    // Handling selection
    const handleExerciseSelect = (e) => {
        setSelectedExercise(e.target.value);
    };

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
        <div 
            className="relative min-h-screen px-6 py-4 bg-cover bg-center" 
            style={{ backgroundImage: `url(${BackgroundImage})` }} 
        >
            
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/10 pointer-events-none"></div>

            {/* Main content */}
            <div className="relative z-10">
                <h1 className="text-5xl font-extrabold text-center text-purple-400 mb-6">Physical Health Exercises</h1>

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

                {/*Checking if the array has elements or not*/}
                {exerciseSuggestions.length > 0 ? (
                    // grid-cols-1: 1 column by default, md:grid-cols-2: 2 column on medium screens and lg:grid-cols-3: 3 colums on large screen
                    <div id="exerciseSuggestions" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exerciseSuggestions.map((exercise, index) => (
                            <div key={index} className="bg-white bg-opacity-90 p-4 rounded-md shadow-lg border-2 border-black p-6">
                                <h3 className="text-xl font-bold capitalize">{exercise.name}</h3>
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
                    <p></p>
                )}
            </div>
        </div>
    );
}

export default Exercises;
