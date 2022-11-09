import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from '../App';
import {breakIconTestId, workIconTestId} from "../components/TestId";

describe('WorkBreakTransition should', () => {

    it('hide start button when timer is 0', () => {
        render(<App initialPomodoroCountdownInSeconds={0}/>);
        expect(screen.queryByText('Start')).not.toBeInTheDocument();
    });

    it('hide stop button when timer reaches 0', async () => {
        render(<App initialPomodoroCountdownInSeconds={1}/>);
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        await new Promise((r) => setTimeout(r, 1500));
        expect(screen.queryByText('Stop')).not.toBeInTheDocument();
    });

    it('start break after clicking transition button', () => {
        render(<App initialPomodoroCountdownInSeconds={0}/>);
        const startBreakButton = screen.getByTestId('work-to-break-icon');
        fireEvent.click(startBreakButton);
        expect(screen.getByTestId(breakIconTestId)).toBeInTheDocument();
    });

    it('start work after clicking transition button', () => {
        render(<App startWithBreak={true} initialBreakCountdownInSeconds={0}/>);
        const startWorkButton = screen.getByTestId('break-to-work-icon');
        fireEvent.click(startWorkButton);
        expect(screen.getByTestId(workIconTestId)).toBeInTheDocument();
    });

});