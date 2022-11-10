import React from "react";
import CoffeeIcon from "@mui/icons-material/CoffeeRounded";
import ApartmentIcon from '@mui/icons-material/Apartment';
import {breakIconTestId, workIconTestId} from "./TestId";

interface StatusIconProps {
    getCountdownInSeconds: () => number;
    havingBreak?: boolean;
}

export default function StatusIcon({
                                       getCountdownInSeconds,
                                       havingBreak
                                   }: StatusIconProps) {

    const isBreakIconVisible = () => {
        return havingBreak && getCountdownInSeconds() > 0;
    };

    const isWorkIconVisible = () => {
        return !havingBreak && getCountdownInSeconds() > 0;
    };

    return (
        <div>
            {isBreakIconVisible() && <CoffeeIcon data-testid={breakIconTestId} style={{fontSize: 90}}/>}
            {isWorkIconVisible() && <ApartmentIcon data-testid={workIconTestId} style={{fontSize: 90}}/>}
        </div>
    );
}
