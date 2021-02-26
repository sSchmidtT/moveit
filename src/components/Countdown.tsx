// @flow
import {useState, useEffect, useContext} from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
    const {
        isActive, 
        isHasFinished, 
        nameBtn, 
        minutes,
        seconds,
        startCountdown } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
      
    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {isHasFinished ? (
                <button disabled className={styles.countdownButton} >
                    Ciclo encerrado
                </button>
            ) : (
                <button type="button" 
                    className={!isActive ? styles.countdownButton : `${styles.countdownButton} ${styles.countdownButtonActive}`} 
                    onClick={startCountdown}
                >
                    {nameBtn}
                </button>
            )}
        </div>
    );
};