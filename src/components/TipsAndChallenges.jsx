import React from 'react';
import { useTipsAndChallenges } from '../ContextAPI/TipsAndChallengesContext';

const TipsAndChallenges = () => {
    // We have already initialized the state variable globally inside the ExercisesContext.jsx, i.e, Context Provider
    const { wellnessTips, workoutChallenges } = useTipsAndChallenges();

    return (
        <div>
            {/**Tips*/}
            <h2>Wellness Tips</h2>
            <ul>
                {wellnessTips.map(tip => (
                    <li key={tip.id}>
                        <h3>{tip.title}</h3>
                        {/**Displays the description of the tips text*/}
                        <p>{tip.tip}</p>
                    </li>
                ))}
            </ul>

            {/**Workout Challenges*/}
            <h2>Workout Challenges</h2>
            <ul>
                {workoutChallenges.map(challenge => (
                    <li key={challenge.id}>
                        <h3>{challenge.title}</h3>
                        <p>{challenge.description}</p>
                        <p><strong>Duration:</strong> {challenge.duration}</p>
                        <p><strong>Difficulty:</strong> {challenge.difficulty}</p>
                        <h4>Goals:</h4>
                        <ul>
                            {challenge.goals.map((goal, index) => (
                                <li key={index}>{goal}</li>
                            ))}
                        </ul>
                        <p><strong>Tip:</strong> {challenge.tip}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TipsAndChallenges;
