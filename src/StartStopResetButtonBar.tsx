import {ButtonGroup} from "@mui/material";
import StartStopButton from "./StartStopButton";
import ResetButton from "./ResetButton";
import React from "react";

interface StartStopResetButtonBarProps {
    startDate: Date | null;
    stopDate: Date | null;
    offsetInSeconds: number;
    active: boolean;
    setActive: (active: boolean) => void;
    setStartDate: (startDate: Date | null) => void;
    setStopDate: (startDate: Date | null) => void;
    setOffsetInSeconds: (offset: number) => void;
}

export default function StartStopResetButtonBar(props: StartStopResetButtonBarProps) {
    return (
        <ButtonGroup variant="text" aria-label="text button group">

            <StartStopButton
                startDate={props.startDate}
                stopDate={props.stopDate}
                offsetInSeconds={props.offsetInSeconds}
                active={props.active}
                setActive={props.setActive}
                setStartDate={props.setStartDate}
                setStopDate={props.setStopDate}
                setOffsetInSeconds={props.setOffsetInSeconds}
            />

            <ResetButton
                setActive={props.setActive}
                setStartDate={props.setStartDate}
                setStopDate={props.setStopDate}
                setOffsetInSeconds={props.setOffsetInSeconds}
            />

        </ButtonGroup>
    );
}