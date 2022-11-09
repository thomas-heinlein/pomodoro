import React from 'react';
import {render, screen} from "@testing-library/react";
import App from "../App";
import {breakIconTestId, breakToWorkTestId, workIconTestId, workToBreakTestId} from "../components/TestId";

describe('CountdownLabel should', () => {

    it('display break icon when in break status and still seconds left', () => {
        render(<App startWithBreak={true} initialBreakCountdownInSeconds={10}/>);
        expect(screen.getByTestId(breakIconTestId)).toBeInTheDocument();
    });

    it('display work icon initially', () => {
        render(<App/>);
        expect(screen.getByTestId(workIconTestId)).toBeInTheDocument();
    });

    it('display work to break icon when timer reaches 0', () => {
        render(<App initialPomodoroCountdownInSeconds={0}/>);
        expect(screen.getByTestId(workToBreakTestId)).toBeInTheDocument();
    });

    it('display break to work icon when timer reaches 0', () => {
        render(<App startWithBreak={true} initialBreakCountdownInSeconds={0}/>);
        expect(screen.getByTestId(breakToWorkTestId)).toBeInTheDocument();
    });

});