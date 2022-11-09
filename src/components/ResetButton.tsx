import React from "react";
import Button from '@mui/material/Button';

interface ResetButtonProps {
    setActive: (active: boolean) => void;
    setStartDate: (startDate: Date | null) => void;
    setStopDate: (startDate: Date | null) => void;
    setOffsetInSeconds: (offset: number) => void;
    setHavingBreak: (havingBreak: boolean) => void;
}

export default function ResetButton(props: ResetButtonProps) {
    const reset = () => {
        props.setStartDate(null);
        props.setStopDate(null);
        props.setActive(false);
        props.setOffsetInSeconds(0);
        props.setHavingBreak(false);
    }

    return <Button size="large" onClick={() => reset()}>Reset</Button>;
}