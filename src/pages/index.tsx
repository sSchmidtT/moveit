import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import Head from 'next/head'
import { GetServerSideProps } from 'next';

import styles from '../styles/pages/Home.module.css';
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengeProvider } from "../contexts/ChallengeContext";

interface CookiesProps {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export default function Home(props:CookiesProps) {
  return (
    <ChallengeProvider
      level={props.level}
      challengesCompleted={props.challengesCompleted}
      currentExperience={props.currentExperience}
    >
      <div className={styles.container}>
          <Head>
            <title>Início | move.it</title>
          </Head>
          <ExperienceBar />

          <CountdownProvider>
            <section>
                <div>
                    <Profile />
                    <CompletedChallenges />
                    <Countdown />
                </div>
                <div>
                    <ChallengeBox />
                </div>
            </section>
          </CountdownProvider>
      </div>
    </ChallengeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {level, currentExperience, challengesCompleted } = ctx.req.cookies;

    return {
      props: {
        level: Number(level) ? Number(level) : 1,
        currentExperience: Number(currentExperience) ? Number(currentExperience) : 0,
        challengesCompleted: Number(challengesCompleted) ? Number(challengesCompleted) : 0
      }
    }
}

// #rumoaoproximonivel
// #jonadainfinita
// #focopraticagrupo
// #neverstoplearning
// #missioncomplete