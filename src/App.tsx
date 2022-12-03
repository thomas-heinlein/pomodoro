import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import CountdownLabel from "./components/CountdownLabel";
import ConfigButton from "./components/ConfigButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getFormattedTime from "./components/TimeFormatter";
import StartStopResetButtonBar from "./components/StartStopResetButtonBar";
import BreakIcon from "./components/BreakIcon";
import getTimeDifferenceInSeconds from "./components/TimeDifferenceInSecondsProvider";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
});

interface AppProps {
  initialPomodoroCountdownInSeconds?: number;
  initialBreakCountdownInSeconds?: number;
  startWithBreak?: boolean;
}

function App({
  initialPomodoroCountdownInSeconds,
  initialBreakCountdownInSeconds,
  startWithBreak,
}: AppProps) {
  const getRelevantCountdownInSeconds = () => {
    return havingBreak ? breakCountdownInSeconds : pomodoroCountdownInSeconds;
  };

  const getCountdownInSeconds = () => {
    return Math.max(
      0,
      getRelevantCountdownInSeconds() - getTotalOffsetInSeconds()
    );
  };

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [stopDate, setStopDate] = useState<Date | null>(null);
  const [offsetInSeconds, setOffsetInSeconds] = useState(0);
  const [active, setActive] = useState(false);
  const [havingBreak, setHavingBreak] = useState(startWithBreak);
  const [pomodoroCountdownInSeconds, setPomodoroCountdownInSeconds] = useState(
    initialPomodoroCountdownInSeconds || 25 * 60
  );
  const [breakCountdownInSeconds, setBreakCountdownInSeconds] = useState(
    initialBreakCountdownInSeconds || 5 * 60
  );

  useEffect(() => {
    let timer: any = null;
    document.title = getFormattedTime(getCountdownInSeconds());
    if (active) {
      timer = setInterval(() => {
        const countdownInSeconds = getCountdownInSeconds();
        if (countdownInSeconds === 0) {
          setHavingBreak(!havingBreak);
          setStartDate(null);
          setStopDate(null);
          setOffsetInSeconds(0);
          setActive(false);
        } else {
          document.title = getFormattedTime(getCountdownInSeconds());
          forceUpdate();
        }
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
      return (
        getTimeDifferenceInSeconds(startDate, new Date()) + offsetInSeconds
      );
    }
    if (startDate && stopDate) {
      return getTimeDifferenceInSeconds(startDate, stopDate) + offsetInSeconds;
    }
    throw new Error(
      `State invalid\n active: ${active}\n startDate: ${startDate}\n stopDate: ${stopDate}`
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <div className="noselect">
          <ConfigButton
            setPomodoroCountdownInSeconds={setPomodoroCountdownInSeconds}
            setBreakCountdownInSeconds={setBreakCountdownInSeconds}
            pomodoroCountdownInSeconds={pomodoroCountdownInSeconds}
            breakCountdownInSeconds={breakCountdownInSeconds}
          />
          <CountdownLabel getCountdownInSeconds={getCountdownInSeconds} />
          <BreakIcon
            getCountdownInSeconds={getCountdownInSeconds}
            havingBreak={havingBreak}
          />
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
        <br />
      </div>
    </ThemeProvider>
  );
}

export default App;
