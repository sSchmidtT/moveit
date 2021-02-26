// @flow
import * as React from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';

import styles from '../styles/components/Profile.module.css'
type Props = {
  
};
export function Profile(props: Props) {
  const { level } = React.useContext(ChallengeContext);
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/sSchmidtT.png" alt="Schmidt" />
      <div>
            <strong>Schmidt</strong>
            <p>
                <img src="icons/level.svg" alt="" /> 
                Level {level}
            </p>
      </div>
    </div>
  );
};