import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import CountdownLabel from "./CountdownLabel";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getFormattedTime from "./TimeFormatter";
import StartStopResetButtonBar from "./StartStopResetButtonBar";
import StatusTransitionIcon from "./StatusTransitionIcon";
import getTimeDifferenceInSeconds from "./TimeDifferenceInSecondsProvider";
import {act} from "@testing-library/react";

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: [
            'serif',
        ].join(','),
    },
});


interface AppProps {
    initialPomodoroCountdownInSeconds?: number;
    initialBreakCountdownInSeconds?: number;
    startWithBreak?: boolean;
}

function App({initialPomodoroCountdownInSeconds, initialBreakCountdownInSeconds, startWithBreak}: AppProps) {

    const getInitialPomodoroCountdownInSeconds = () => {
        return initialPomodoroCountdownInSeconds !== undefined ? initialPomodoroCountdownInSeconds : 25 * 60;
    }

    const getInitialBreakCountdownInSeconds = () => {
        return initialBreakCountdownInSeconds !== undefined ? initialBreakCountdownInSeconds : 5 * 60;
    }

    const getRelevantInitialCountdownInSeconds = () => {
        return havingBreak ? getInitialBreakCountdownInSeconds() : getInitialPomodoroCountdownInSeconds();
    }

    const getCountdownInSeconds = () => {
        return Math.max(0, getRelevantInitialCountdownInSeconds() - getTotalOffsetInSeconds());
    }

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const [startDate, setStartDate] = useState<Date | null>(null);

    const [stopDate, setStopDate] = useState<Date | null>(null);

    const [offsetInSeconds, setOffsetInSeconds] = useState(0);

    const [active, setActive] = useState(false);

    const [havingBreak, setHavingBreak] = useState(startWithBreak);

    useEffect(() => {
        let timer: any = null;
        document.title = getFormattedTime(getCountdownInSeconds());
        if (active) {
            timer = setInterval(() => {
                document.title = getFormattedTime(getCountdownInSeconds());
                act(() => {
                    forceUpdate();
                });
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [getCountdownInSeconds, offsetInSeconds, startDate, stopDate, active]);

    const getTotalOffsetInSeconds = () => {
        if (!startDate) {
            return 0;
        }
        if (active) {
            return getTimeDifferenceInSeconds(startDate, new Date()) + offsetInSeconds;
        }
        if (startDate && stopDate) {
            return getTimeDifferenceInSeconds(startDate, stopDate) + offsetInSeconds;
        }
        throw new Error(`State invalid\n active: ${active}\n startDate: ${startDate}\n stopDate: ${stopDate}`);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App">
                <StatusTransitionIcon getCountdownInSeconds={getCountdownInSeconds} havingBreak={havingBreak}
                                      setHavingBreak={setHavingBreak}/>
                <div className="noselect">
                    <CountdownLabel getCountdownInSeconds={getCountdownInSeconds}/>
                </div>
                <StartStopResetButtonBar
                    startDate={startDate}
                    stopDate={stopDate}
                    offsetInSeconds={offsetInSeconds}
                    active={active}
                    setActive={setActive}
                    setStartDate={setStartDate}
                    setStopDate={setStopDate}
                    setOffsetInSeconds={setOffsetInSeconds}
                    getCountdownInSeconds={getCountdownInSeconds}
                    setHavingBreak={setHavingBreak}
                />
                <br/>
            </div>
        </ThemeProvider>
    );
}

export default App;
