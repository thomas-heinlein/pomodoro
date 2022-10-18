import React from "react";
import getFormattedTime from "./TimeFormatter";

interface CountdownProps {
    getCountdownInSeconds: () => number;
}

export default function CountdownLabel({getCountdownInSeconds}: CountdownProps) {
    return <p>
        {getFormattedTime(getCountdownInSeconds())}
    </p>;
}