import React from 'react';
import {render, screen} from "@testing-library/react";
import App from "../App";
import {breakIconTestId, workIconTestId} from "../components/TestId";

describe('CountdownLabel should', () => {

    it('display break icon when in break status and still seconds left', () => {
        render(<App startWithBreak={true} initialBreakCountdownInSeconds={10}/>);
        expect(screen.getByTestId(breakIconTestId)).toBeInTheDocument();
    });

    it('display work icon initially', () => {
        render(<App/>);
        expect(screen.getByTestId(workIconTestId)).toBeInTheDocument();
    });

});