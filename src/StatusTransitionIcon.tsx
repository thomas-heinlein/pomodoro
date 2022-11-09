import React from "react";
import CoffeeIcon from "@mui/icons-material/CoffeeRounded";
import LaptopIcon from "@mui/icons-material/LaptopMac";
import ArrowIcon from '@mui/icons-material/ArrowRightAlt';
import {IconButton} from "@mui/material";

interface StatusIconProps {
    getCountdownInSeconds: () => number;
    havingBreak?: boolean;
    setHavingBreak: (havingBreak: boolean) => void;
}

export default function StatusTransitionIcon({
                                                 getCountdownInSeconds,
                                                 havingBreak,
                                                 setHavingBreak
                                             }: StatusIconProps) {

    const isBreakIconVisible = () => {
        return havingBreak && getCountdownInSeconds() > 0;
    };

    const isWorkIconVisible = () => {
        return !havingBreak && getCountdownInSeconds() > 0;
    };

    const isWorkToBreakTransitionVisible = () => {
        return !havingBreak && getCountdownInSeconds() === 0;
    }

    const isBreakToWorkTransitionVisible = () => {
        return havingBreak && getCountdownInSeconds() === 0;
    }

    const startBreak = () => {
        setHavingBreak(true);
    };

    const startWork = () => {
        setHavingBreak(false);
    };

    return (
        <div>
            {isBreakIconVisible() && <CoffeeIcon data-testid={'break-icon'} fontSize="large"/>}
            {isWorkIconVisible() && <LaptopIcon data-testid={'work-icon'} fontSize="large"/>}
            {
                isWorkToBreakTransitionVisible() &&
                <IconButton color="primary" aria-label="upload picture" component="label"
                            data-testid={"work-to-break-icon"} onClick={startBreak}>
                    <LaptopIcon fontSize="large"/><ArrowIcon fontSize="large"/><CoffeeIcon
                    fontSize="large"/>
                </IconButton>
            }
            {
                isBreakToWorkTransitionVisible() &&
                <IconButton color="primary" aria-label="upload picture" component="label"
                            data-testid={"break-to-work-icon"} onClick={startWork}>
                    <CoffeeIcon fontSize="large"/><ArrowIcon fontSize="large"/><LaptopIcon fontSize="large"/>
                </IconButton>
            }
        </div>
    );
}
