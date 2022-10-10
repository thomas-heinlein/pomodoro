import React, {useEffect, useState} from 'react';
import './App.css';
import CountdownLabel from "./CountdownLabel";
import DoneLabel from "./DoneLabel";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getFormattedTime from "./TimeFormatter";
import StartStopResetButtonBar from "./StartStopResetButtonBar";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


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
        document.title = getFormattedTime(countdownInSeconds);
        if (active) {
            timer = setInterval(() => {
                const decrementedCountdownInSeconds = decrementTimer(countdownInSeconds);
                setCountdownInSeconds((countdownInSeconds) => decrementedCountdownInSeconds);
                document.title = getFormattedTime(decrementedCountdownInSeconds);
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
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <div className="App">
                <CountdownLabel countdownInSeconds={countdownInSeconds}/>

                <StartStopResetButtonBar getInitialCountdownInSeconds={getInitialCountdownInSeconds}
                                         toggleActive={toggleActive}
                                         active={active}
                                         setCountdownInSeconds={setCountdownInSeconds}
                />

                <DoneLabel countdownInSeconds={countdownInSeconds}/>
            </div>
        </ThemeProvider>
    );
}

export default App;
