import React from 'react';
import {render, screen} from "@testing-library/react";
import App from "../App";
import {breakIconTestId} from "../components/TestId";

describe('BreakIcon should', () => {

    it('display break icon when in break status', () => {
        render(<App startWithBreak={true} initialBreakCountdownInSeconds={10}/>);
        expect(screen.getByTestId(breakIconTestId)).toBeInTheDocument();
    });

    it('not display break icon when not in break status', () => {
        render(<App/>);
        expect(screen.queryByTestId(breakIconTestId)).not.toBeInTheDocument();
    });

});