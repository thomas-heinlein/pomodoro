import {ButtonGroup} from "@mui/material";
import StartStopButton from "./StartStopButton";
import ResetButton from "./ResetButton";
import React from "react";

interface StartStopResetButtonBarProps {
    toggleActive: (active: boolean) => void;
    active: boolean;
    setCountdownInSeconds: (countDownInSeconds: number) => void;
    getInitialCountdownInSeconds: () => number;
}

export default function StartStopResetButtonBar(props: StartStopResetButtonBarProps) {
    return (
        <ButtonGroup variant="text" aria-label="text button group">

            <StartStopButton toggleActive={props.toggleActive} active={props.active}/>

            <ResetButton
                setCountdownInSeconds={props.setCountdownInSeconds}
                getInitialCountdownInSeconds={props.getInitialCountdownInSeconds}
                toggleActive={props.toggleActive}
            />

        </ButtonGroup>
    );
}