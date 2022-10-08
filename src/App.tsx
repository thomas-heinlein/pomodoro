import React, {useEffect, useState} from 'react';
import './App.css';
import CountdownLabel from "./CountdownLabel";
import StartStopButton from "./StartStopButton";
import ResetButton from "./ResetButton";
import DoneLabel from "./DoneLabel";
import {ButtonGroup} from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <div className="App">
                <CountdownLabel countdownInSeconds={countdownInSeconds}/>

                <ButtonGroup variant="text" aria-label="text button group">

                    <StartStopButton toggleActive={toggleActive} active={active}/>

                    <ResetButton
                        setCountdownInSeconds={setCountdownInSeconds}
                        getInitialCountdownInSeconds={getInitialCountdownInSeconds}
                        toggleActive={toggleActive}
                    />

                </ButtonGroup>

                <DoneLabel countdownInSeconds={countdownInSeconds}/>
            </div>
        </ThemeProvider>
    );
}

export default App;
