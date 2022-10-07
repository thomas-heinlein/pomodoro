import React from "react";

interface CountdownProps {
    countdownInSeconds: number;
}

export default function Countdown({countdownInSeconds}: CountdownProps) {

    const getMinutes = () => {
        return Math.floor(countdownInSeconds / 60);
    }

    const getSeconds = () => {
        let seconds = countdownInSeconds - getMinutes() * 60;
        if (seconds.toString().length === 1) {
            return '0' + seconds;
        }
        return seconds;
    }

    return <p>{getMinutes()}:{getSeconds()}</p>;
}