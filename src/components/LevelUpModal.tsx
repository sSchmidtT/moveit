// @flow 
import * as React from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';

import styles from '../styles/components/LevelUpModal.module.css'

type Props = {
    
};
export const LevelUpModal = (props: Props) => {
    const { level, closeLevelUpModal } = React.useContext(ChallengeContext);
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>

                <strong>Parabéns</strong>
                <p>Você alcançou um novo level.</p>

                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Fechar"/>
                </button>
            </div>
            
        </div>
    );
};