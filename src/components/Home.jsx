//About or Home Page

import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="bg-white min-h-screen px-6 py-4">
            <h1 className="text-5xl font-extrabold text-center text-black mb-6">
                Welcome to WelloCity
            </h1>

            <section className="mb-12">
                <h2 className="text-4xl font-semibold text-center text-black mb-4">
                    About WelloCity
                </h2>
                <p className="text-lg text-center text-gray-700 mb-4">
                    Welcome to **WelloCity**, your personal health and wellness
                    companion! Our mission is to empower you to live a healthier,
                    happier life by providing you with the tools, resources, and
                    support you need to achieve your fitness goals.
                </p>

                <p className="text-lg text-center text-gray-700 mb-4">
                    WelloCity is an all-in-one app designed to help you manage
                    your fitness journey. Whether you want to track your daily
                    activity, improve your nutrition, explore new exercise
                    routines, or stay motivated, WelloCity has you covered. Our
                    app features:
                </p>

                <ul className="list-disc pl-6 text-lg text-gray-700 mb-6">
                    <li>Nutrition Guidance</li>
                    <li>Exercise Tracking</li>
                    <li>Fitness Challenges</li>
                </ul>

                <p className="text-lg text-center text-gray-700 mb-4">
                    Our goal is to make health and wellness accessible to
                    everyone, no matter where you are on your journey.
                </p>

                <p className="text-lg text-center text-gray-700 mb-4">
                    Whether you're just starting out or you're an experienced
                    athlete, WelloCity is here to guide you every step of the way.
                </p>

                <p className="text-lg text-center text-gray-700 mb-4">
                    <span className="font-bold">Legal Disclaimer:</span>
                    Please note that the information provided in this app is for informational purposes only
                    and should not be used as a substitute for professional medical advice.
                    Always consult with a healthcare professional before starting any new fitness or nutrition program.
                </p>
            </section>
        </div>
    );
}

export default Home;
