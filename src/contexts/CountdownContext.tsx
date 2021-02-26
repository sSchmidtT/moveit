import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengeContext } from './ChallengeContext';

interface CountdownContextData {
    isActive: boolean;
    isHasFinished: boolean;
    nameBtn: string;
    minutes: number;
    seconds: number;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;
let countdownTime = 0.1

export function CountdownProvider({ children } : CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengeContext);

    const [time, setTime] = useState(countdownTime * 60);
    const [isActive, setIsActive] = useState(false);
    const [isHasFinished, setIsHasFinished] = useState(false);
    const [nameBtn, setNameBtn] = useState('Iniciar um ciclo')

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    useEffect(() =>{
        if (isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }else if (isActive && time == 0) {
            setIsHasFinished(true);
            startNewChallenge();
        }
        
    }, [isActive, time])

    function resetCountdown(){
        setIsActive(false);
        setNameBtn('Iniciar um ciclo');
        setTime(countdownTime * 60);
        clearTimeout(countdownTimeout);
        setIsHasFinished(false);
    }

    function startCountdown(){
        setIsActive(! isActive);
        if (!isActive) {
            setNameBtn('Abandonar um ciclo');
        }else {
            resetCountdown();
        }

    }

    return (
        <CountdownContext.Provider value={{
            isActive,
            isHasFinished,
            nameBtn,
            minutes,
            seconds,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}
