import React from "react";

interface ResetButtonProps {
    setCountdownInSeconds: (countdownInSeconds: number) => void;
    getInitialCountdownInSeconds: () => number;
    toggleActive: (active: boolean) => void;
}

export default function ResetButton(props: ResetButtonProps) {
    const reset = () => {
        props.setCountdownInSeconds(props.getInitialCountdownInSeconds());
        props.toggleActive(false);
    }

    return <button onClick={() => reset()}>Reset</button>;
}