import React, {useEffect, useState} from 'react';
import './App.css';
import Countdown from "./Countdown";
import StartStopButton from "./StartStopButton";

function App() {
    const [countdownInSeconds, setCountdownInSeconds] = useState(25 * 60);
    const [active, toggleActive] = useState(false);

    useEffect(() => {
        let timer: any = null;
        if (active) {
            timer = setInterval(() => {
                setCountdownInSeconds((countdownInSeconds) => countdownInSeconds - 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [countdownInSeconds, active]);


    return (
        <div className="App">
            <Countdown countdownInSeconds={countdownInSeconds}/>
            <StartStopButton toggleActive={toggleActive} active={active}/>
        </div>
    );
}

export default App;
