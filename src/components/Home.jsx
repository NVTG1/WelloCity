//Home Page that describes details about the App
import React from "react";
import BackgroundImage from "../assets/Home.avif";
import Image from "../assets/Hello.webp"; 

function Home() {
    return (
        <div className="relative w-full min-h-screen px-6 py-8">

            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30"
                style={{
                    backgroundImage: `url(${BackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>

            <section className="relative z-10 max-w-6xl mx-auto bg-gradient-to-tr from-green-100 via-white to-blue-100 shadow-2xl rounded-2xl px-8 py-10 mt-6">

                <div className="w-full bg-green-600 p-6 rounded-lg shadow-lg mb-6">
                    <p className="text-lg text-white text-center mb-5">
                        Welcome to <strong>WelloCity (Wellness + Velocity)</strong>, your personal health and wellness
                        companion! Our mission is to empower you to live a healthier,
                        happier life by providing you with the tools, resources, and
                        support you need to achieve your fitness goals.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">

                    {/* About App */}
                    <div className="flex-1">

                        <h2 className="w-full text-4xl font-bold text-center text-blue-800 mb-6">
                            About WelloCity
                        </h2>


                        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                            <p className="text-lg text-gray-700 text-center mb-5">
                                WelloCity is an all-in-one app designed to help you manage
                                your fitness journey. Whether you want to track your daily
                                activity, improve your nutrition, explore new exercise
                                routines, or stay motivated, WelloCity has you covered. Our
                                app features:
                            </p>

                            <ul className="list-disc pl-10 text-lg text-gray-800 space-y-2">
                                <li className="hover:text-green-600 transition duration-300">
                                    Nutrition Guidance
                                </li>
                                <li className="hover:text-green-600 transition duration-300">
                                    Exercise Guidance
                                </li>
                                <li className="hover:text-green-600 transition duration-300">
                                    Fitness Tracking
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                            <p className="text-lg text-gray-700 text-center mb-5">
                                Our goal is to make health and wellness accessible to
                                everyone, no matter where you are on your journey.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                            <p className="text-lg text-gray-700 text-center mb-5">
                                Whether you're just starting out or you're an experienced
                                athlete, WelloCity is here to guide you every step of the way.
                            </p>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="flex-1">
                        <img
                            src={Image}
                            alt="WelloCity App"
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>

                </div>

                <div className="w-full bg-green-600 p-6 rounded-lg shadow-lg mt-6">
                    <p className="text-lg text-white text-center mb-5">
                        Whether you're just starting out or you're an experienced
                        athlete, WelloCity is here to guide you every step of the way.
                    </p>
                </div>

                <div className="w-full bg-white p-6 rounded-lg shadow-lg mt-6">
                    <p className="text-lg text-red-600 text-center mb-5">
                        <span className="font-bold">Legal Disclaimer:</span>
                        &nbsp;Please note that the information provided in this app is for informational purposes only
                        and should not be used as a substitute for professional medical advice.
                        Always consult with a healthcare professional before starting any new fitness or nutrition program.
                    </p>
                </div>


            </section>
        </div>
    );
}

export default Home;
