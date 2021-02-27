import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import { strict } from 'assert';
import { LevelUpModal } from '../components/LevelUpModal';

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
    closeLevelUpModal: () => void;
}

interface ChallengeProviderProps {
    children: ReactNode;
    level: number;
    challengesCompleted: number;
    currentExperience: number;
}

export let ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider(props: ChallengeProviderProps){
    const [level, setLevel] = useState(props.level);
    const [currentExperience, setCurrentExperience] = useState(props.currentExperience);
    const [challengeCompleted, setChallengeCompleted] = useState(props.challengesCompleted);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    let experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);
    
    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengeCompleted', String(challengeCompleted));
    }, [level, currentExperience, challengeCompleted]);


    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
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
                succeededChallenge,
                closeLevelUpModal,
            }
        }>
            {props.children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengeContext.Provider>
    )
}