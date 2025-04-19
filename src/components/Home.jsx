// src/components/HomePage.js
import React from 'react';

function Home() {
  return (
    <div className="flex justify-center items-center h-full text-center px-4">
      <div className="max-w-4xl text-white">
        <h2 className="text-2xl font-bold mb-4">Welcome to the Health Hub</h2>
        <p className="text-lg mb-4">
          At our Health Hub, we believe that good health is the foundation of a fulfilling life. 
          We offer resources, tips, and guidance to help you achieve and maintain optimal health.
        </p>
        <p className="text-lg mb-4">
          Our focus is on holistic wellness, encompassing both physical and mental well-being. 
          From fitness tips to mental health advice, we cover it all to ensure you can lead a healthy and happy life.
        </p>
        <p className="text-lg">
          Join us in our journey towards better health and well-being. Together, we can make a positive change!
        </p>
      </div>
    </div>
  );
};

export default Home;
