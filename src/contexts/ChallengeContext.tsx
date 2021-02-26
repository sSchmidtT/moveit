import { createContext, ReactNode, useEffect, useState } from 'react';

import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeContextData {
    level: number;
    currentExperience: number; 
    challengeCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    failedChallenge: () => void;
    succeededChallenge: () => void;
}

interface ChallengeProviderProps {
    children: ReactNode;
}

export let ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({children}: ChallengeProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengeCompleted, setChallengeCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    let experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        let randomChallengeIndex = Math.floor(Math.random() * (challenges.length - 1));
        let challenge = challenges[randomChallengeIndex];
        
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🥳', {
                body: `Valendo ${challenge.amount}xp`
            });
        }
    }

    function failedChallenge() {
        setActiveChallenge(null);
    }

    function succeededChallenge(){
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
            experienceToNextLevel = Math.pow((level + 1) * 4, 2);
        }

        setCurrentExperience(finalExperience);
        setChallengeCompleted (challengeCompleted + 1);
        setActiveChallenge(null);
    }

    return (
        <ChallengeContext.Provider value={
            {
                level, 
                currentExperience, 
                challengeCompleted, 
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                activeChallenge,
                failedChallenge,
                succeededChallenge
            }
        }>
            {children}
        </ChallengeContext.Provider>
    )
}