import React from "react";
import getFormattedTime from "./TimeFormatter";

interface CountdownProps {
    countdownInSeconds: number;
}

export default function CountdownLabel({countdownInSeconds}: CountdownProps) {
    return <p>
        {getFormattedTime(countdownInSeconds)}
    </p>;
}