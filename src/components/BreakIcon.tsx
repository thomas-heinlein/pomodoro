import React from "react";
import CoffeeIcon from "@mui/icons-material/CoffeeRounded";
import {breakIconTestId} from "./TestId";

interface StatusIconProps {
    getCountdownInSeconds: () => number;
    havingBreak?: boolean;
}

export default function BreakIcon({
                                       getCountdownInSeconds,
                                       havingBreak
                                   }: StatusIconProps) {

    const isBreakIconVisible = () => {
        return havingBreak && getCountdownInSeconds() > 0;
    };

    return (
        <div>
            {isBreakIconVisible() && <CoffeeIcon data-testid={breakIconTestId} style={{fontSize: 90}}/>}
        </div>
    );
}
