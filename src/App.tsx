import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import CountdownLabel from "./CountdownLabel";
import DoneLabel from "./DoneLabel";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getFormattedTime from "./TimeFormatter";
import StartStopResetButtonBar from "./StartStopResetButtonBar";
import getTimeDifferenceInSeconds from "./TimeDifferenceInSecondsProvider";

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

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const [startDate, setStartDate] = useState<Date | null>(null);

    const [stopDate, setStopDate] = useState<Date | null>(null);

    const [offsetInSeconds, setOffsetInSeconds] = useState(0);

    const [active, setActive] = useState(false);

    useEffect(() => {
        let timer: any = null;
        document.title = getFormattedTime(getCountdownInSeconds());
        if (active) {
            timer = setInterval(() => {
                document.title = getFormattedTime(getCountdownInSeconds());
                forceUpdate();
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [offsetInSeconds, startDate, stopDate, active]);

    const getCountdownInSeconds = () => {
        return getInitialCountdownInSeconds() - getTotalOffsetInSeconds();
    }

    const getTotalOffsetInSeconds = () => {
        if (!startDate) {
            return 0;
        }
        if (active) {
            return getTimeDifferenceInSeconds(startDate, new Date()) - offsetInSeconds;
        }
        if (startDate && stopDate) {
            return getTimeDifferenceInSeconds(startDate, stopDate) - offsetInSeconds;
        }
        throw new Error(`State invalid\n active: ${active}\n startDate: ${startDate}\n stopDate: ${stopDate}`);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <div className="App">
                <CountdownLabel getCountdownInSeconds={getCountdownInSeconds}/>

                <StartStopResetButtonBar
                    startDate={startDate}
                    stopDate={stopDate}
                    offsetInSeconds={offsetInSeconds}
                    active={active}
                    setActive={setActive}
                    setStartDate={setStartDate}
                    setStopDate={setStopDate}
                    setOffsetInSeconds={setOffsetInSeconds}
                />

                <DoneLabel getCountdownInSeconds={getCountdownInSeconds}/>
            </div>
        </ThemeProvider>
    );
}

export default App;
