import React from "react";
import { Link } from 'react-router-dom'; //Using Browser Router to route the links
import Logo from "../assets/Logo.png";
import BackgroundImage from "../assets/Heading.jpg";

function Navbar() {
    return (
        <div className="relative w-full px-6 py-4 bg-gradient-to-tr from-green-100 via-white to-blue-100 shadow-md">

            {/* Background Image */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${BackgroundImage})` }}
            ></div>

            {/* Content */}
            <div className="relative z-10">
                {/* Heading */}
                <div className="flex justify-center items-center space-x-4 mb-4">
                    <img
                        src={Logo}
                        alt="WelloCity Logo"
                        className="w-14 h-14 animate-bounce"
                    />
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-green-800 drop-shadow-md">
                        WelloCity
                    </h1>
                </div>

                {/* Links */}
                <nav className="flex justify-center flex-wrap gap-6 bg-white py-3 px-4 shadow rounded-xl max-w-5xl mx-auto">
                    <Link to="/" className="text-blue-700 font-medium hover:underline hover:text-blue-900 transition">Home</Link>
                    <Link to="/recipes" className="text-blue-700 font-medium hover:underline hover:text-blue-900 transition">Recipes</Link>
                    <Link to="/exercises" className="text-blue-700 font-medium hover:underline hover:text-blue-900 transition">Exercises</Link>
                    <Link to="/fitnessTracker" className="text-blue-700 font-medium hover:underline hover:text-blue-900 transition">Fitness Tracker</Link>
                    <Link to="/tipsAndChallenges" className="text-blue-700 font-medium hover:underline hover:text-blue-900 transition">Tips & Challenges</Link>
                    <Link to="/contactUs" className="text-blue-700 font-medium hover:underline hover:text-blue-900 transition">Contact Us</Link>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
