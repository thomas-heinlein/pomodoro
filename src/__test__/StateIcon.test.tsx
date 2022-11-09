import React from 'react';
import {render, screen} from "@testing-library/react";
import App from "../App";

describe('CountdownLabel should', () => {

    it('display break icon when in break status and still seconds left', () => {
        render(<App startWithBreak={true} initialBreakCountdownInSeconds={10}/>);
        expect(screen.getByTestId('break-icon')).toBeInTheDocument();
    });

    it('display work icon initially', () => {
        render(<App/>);
        expect(screen.getByTestId('work-icon')).toBeInTheDocument();
    });

    it('display work to break icon when timer reaches 0', () => {
        render(<App initialPomodoroCountdownInSeconds={0}/>);
        expect(screen.getByTestId('work-to-break-icon')).toBeInTheDocument();
    });

    it('display break to work icon when timer reaches 0', () => {
        render(<App startWithBreak={true} initialBreakCountdownInSeconds={0}/>);
        expect(screen.getByTestId('break-to-work-icon')).toBeInTheDocument();
    });

});