// @flow
import * as React from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';

import styles from '../styles/components/CompletedChallenges.module.css'
type Props = {
  
};
export function CompletedChallenges(props: Props) {
  const { challengeCompleted } = React.useContext(ChallengeContext);

  return (
    <div className={styles.completedChallengesContainer}>
        <span>Desafios completos</span>
        <span>{challengeCompleted}</span>
    </div>
  );
};