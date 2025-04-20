import React, { useState } from 'react';

function Recipes() {
    const [dietSuggestions, setDietSuggestions] = useState([]);
    const [selectedDiet, setSelectedDiet] = useState('');

    // Fetching diet suggestions from Spoonacular API
    const fetchUserDiet = async (dietType) => {
        const apiKey = '32a8f96f9b1c4f489a8a80d4f51fc20e';
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

    // Handle diet type selection
    const handleDietSelect = (e) => {
        setSelectedDiet(e.target.value);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedDiet) {
            fetchUserDiet(selectedDiet);
        } else {
            alert('Please select a diet type');
        }
    };

    return (
        <div className="bg-white min-h-screen px-6 py-4">
            <h1 className="text-5xl font-extrabold text-center text-black mb-6">Recipes and Health Tips</h1>

            {/* Form to select diet type */}
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-8">
                <div className="mb-4">
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        Select a Diet Type
                    </label>
                    <select
                        id="dietType"
                        className="w-full px-4 py-2 border rounded-md"
                        value={selectedDiet}
                        onChange={handleDietSelect}
                    >
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="glutenFree">Gluten-Free</option>
                        <option value="keto">Keto</option>
                        <option value="paleo">Paleo</option>
                    </select>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700"
                    >
                        Get Recipes
                    </button>
                </div>
            </form>

            {/* Display Diet Suggestions */}

            {/*Checking if there are items in dietSuggestions or not*/}
            {dietSuggestions.length > 0 && (
                // grid-cols-1: 1 column by default, md:grid-cols-2: 2 column on medium screens and lg:grid-cols-3: 3 colums on large screen         
                <div id="dietSuggestions" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dietSuggestions.map((recipe) => (
                        <div key={recipe.id} className="bg-gray-100 p-4 rounded-md shadow-lg">
                            <h3 className="text-xl font-semibold">{recipe.title}</h3>
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-48 object-cover mt-4"
                            />

                            {/*Recipe Link*/}
                            <p className="mt-2">
                                <a
                                    href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`}
                                    target="_blank"
                                    className="text-blue-500 hover:underline"
                                >
                                    View Recipe
                                </a>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Recipes;
