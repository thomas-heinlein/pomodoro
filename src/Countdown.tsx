import React from "react";

interface CountdownProps {
    countdownInSeconds: number;
}

export default function Countdown({countdownInSeconds}: CountdownProps) {

    const getMinutes = (): string => {
        let minutes = Math.floor(countdownInSeconds / 60);
        return appendZeroIfNecessary(minutes);
    }

    const getSeconds = (): string => {
        let seconds = countdownInSeconds - +getMinutes() * 60;
        return appendZeroIfNecessary(seconds);
    }

    function appendZeroIfNecessary(time: number) {
        if (time.toString().length === 1) {
            return '0' + time;
        }
        return time.toString();
    }

    return <p>
        {
            getMinutes()
                .toString()
                .concat(':')
                .concat(getSeconds())
        }
    </p>;
}