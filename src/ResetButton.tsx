import React from "react";
import Button from '@mui/material/Button';

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

    return <Button onClick={() => reset()}>Reset</Button>;
}