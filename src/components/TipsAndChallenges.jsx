import React from 'react';
import { useTipsAndChallenges } from '../ContextAPI/TipsAndChallengesContext';

const TipsAndChallenges = () => {
    // We have already initialized the state variable globally inside the ExercisesContext.jsx, i.e, Context Provider
    const { wellnessTips, workoutChallenges } = useTipsAndChallenges();

    return (
        <div className="p-4 space-y-8">
            
            {/** Wellness Tips Section */}
            <div className="border p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Wellness Tips</h2>
                <table className="w-full table-auto border-collapse rounded-lg overflow-hidden shadow-md border">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">Tip</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wellnessTips.map(tip => (
                            <tr key={tip.id} className="border-b">
                                <td className="p-3">
                                    <div className="flex items-center">
                                        {tip.title}
                                    </div>
                                </td>
                                <td className="p-3">
                                    <div className="flex items-center">
                                        <div className="h-full border-r-2 border-gray-300 mr-4"></div>
                                        {tip.tip}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/** Workout Challenges Section */}
            <div className="border p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Workout Challenges</h2>
                <table className="w-full table-auto border-collapse rounded-lg overflow-hidden shadow-md border">
                    <thead className="bg-green-100">
                        <tr>
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">Description</th>
                            <th className="p-3 text-left">Duration</th>
                            <th className="p-3 text-left">Difficulty</th>
                            <th className="p-3 text-left">Goals</th>
                            <th className="p-3 text-left">Tip</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workoutChallenges.map(challenge => (
                            <tr key={challenge.id} className="border-b">
                                <td className="p-3">{challenge.title}</td>
                                <td className="p-3">{challenge.description}</td>
                                <td className="p-3">{challenge.duration}</td>
                                <td className="p-3">{challenge.difficulty}</td>
                                <td className="p-3">
                                    <ul>
                                        {challenge.goals.map((goal, index) => (
                                            <li key={index}>{goal}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="p-3">{challenge.tip}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TipsAndChallenges;
