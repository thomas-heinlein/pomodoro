import React, {useEffect, useState} from 'react';
import './App.css';
import CountdownLabel from "./CountdownLabel";
import StartStopButton from "./StartStopButton";
import ResetButton from "./ResetButton";
import DoneLabel from "./DoneLabel";

interface AppProps {
    initialCountdownInSeconds?: number;
}

function App({initialCountdownInSeconds}: AppProps) {
    const getInitialCountdownInSeconds = () => {
        return initialCountdownInSeconds !== undefined ? initialCountdownInSeconds : 25 * 60;
    }

    const [countdownInSeconds, setCountdownInSeconds] = useState(
        () => getInitialCountdownInSeconds()
    );

    const [active, toggleActive] = useState(false);

    useEffect(() => {
        let timer: any = null;
        if (active) {
            timer = setInterval(() => {
                setCountdownInSeconds((countdownInSeconds) => decrementTimer(countdownInSeconds));
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [countdownInSeconds, active]);

    const decrementTimer = (countdownInSeconds: number) => {
        if (countdownInSeconds > 0) {
            return countdownInSeconds - 1;
        }
        return countdownInSeconds;
    }

    return (
        <div className="App">
            <CountdownLabel countdownInSeconds={countdownInSeconds}/>

            <StartStopButton toggleActive={toggleActive} active={active}/>

            <ResetButton
                setCountdownInSeconds={setCountdownInSeconds}
                getInitialCountdownInSeconds={getInitialCountdownInSeconds}
                toggleActive={toggleActive}
            />

            <DoneLabel countdownInSeconds={countdownInSeconds}/>
        </div>
    );
}

export default App;
