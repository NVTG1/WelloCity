import React from "react";
import { Link } from 'react-router-dom'; //Using Browser Router to route the links

function Navbar() {
    return (
        <div className="bg-blue w-full px-6 py-4">

            {/* Heading */}
            <h1 className="text-4xl font-extrabold text-black text-center mb-3">
                WelloCity
            </h1>

            {/* Links */}
            <div className="flex justify-center space-x-10 text-black text-xl font-semibold">
                <Link to="/">Home</Link>
                <Link to="/recipes">Recipes</Link>
                <Link to="/exercises">Exercises</Link>
                <Link to="/fitnessTracker">Fitness Tracker</Link>
                <Link to="/contactUs">Contact Us</Link>
            </div>
        </div>
    );
}

export default Navbar;
