import React, {useEffect, useState} from 'react';
import './App.css';
import Countdown from "./Countdown";
import StartStopButton from "./StartStopButton";

interface AppProps {
    initialCountdownInSeconds?: number;
}

function App({initialCountdownInSeconds}: AppProps) {

    const [countdownInSeconds, setCountdownInSeconds] = useState(
        initialCountdownInSeconds !== undefined ? initialCountdownInSeconds : 25 * 60
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

    const isDoneVisible = () => {
        return countdownInSeconds === 0;
    }

    return (
        <div className="App">
            <Countdown countdownInSeconds={countdownInSeconds}/>
            <StartStopButton toggleActive={toggleActive} active={active}/>
            {isDoneVisible() && <p>Done</p>}
        </div>
    );
}

export default App;
