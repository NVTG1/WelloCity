import React from 'react';
import { useRecipe } from '../ContextAPI/RecipeContext';
import BackgroundImage from '../assets/Recipes.jpg'; 

function Recipes() {

    // We have already initialized the state variable globally inside the ExercisesContext.jsx, i.e, Context Provider
    const {
        dietSuggestions,
        selectedDiet,
        setSelectedDiet,
        fetchUserDiet,
    } = useRecipe();   

    // Handling selection
    const handleDietSelect = (e) => {
        setSelectedDiet(e.target.value);
    };

    // Handling submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedDiet) {
            fetchUserDiet(selectedDiet);
        } else {
            alert('Please select a diet type');
        }
    };

    return (
        <div className="relative min-h-screen">
            {/* Background Image */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-60 -z-10"
                style={{
                    backgroundImage: `url(${BackgroundImage})`, 
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>

            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-50 -z-5"></div>

            {/* Main Content */}
            <div className="px-6 py-4 relative z-10">
                <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-6">Recipes and Health Tips</h1>

                {/* Form to select diet type */}
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-8">
                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-800 mb-2">
                            Select a Diet Type
                        </label>
                        <select
                            id="dietType"
                            className="w-full px-4 py-2 border rounded-md text-gray-700"
                            value={selectedDiet}
                            onChange={handleDietSelect}
                        >
                            <option value="">---Choose a diet type---</option>
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
                            className="px-6 py-2 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-600"
                        >
                            Get Recipes
                        </button>
                    </div>
                </form>

                {/* Display Diet Suggestions */}
                {dietSuggestions.length > 0 && (
                    <div id="dietSuggestions" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dietSuggestions.map((recipe) => (
                            <div key={recipe.id} className="bg-green p-4 rounded-md shadow-lg border-2 border-[#D2B48C] rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-900">{recipe.title}</h3>
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
        </div>
    );
}

export default Recipes;
