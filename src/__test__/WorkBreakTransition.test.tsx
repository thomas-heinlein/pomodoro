import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from '../App';

describe('WorkBreakTransition should', () => {

    it('sets countdown to 5 minutes after reaching 0 seconds during pomodoro', async () => {
        render(<App initialPomodoroCountdownInSeconds={1}/>);
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        await new Promise((r) => setTimeout(r, 1500));

        expect(screen.getByText('05:00')).toBeInTheDocument();
        expect(screen.getByText('Start')).toBeInTheDocument();
    });

    it('sets countdown to 25 minutes after reaching 0 seconds during pomodoro', async () => {
        render(<App startWithBreak={true} initialBreakCountdownInSeconds={1}/>);
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        await new Promise((r) => setTimeout(r, 1500));

        expect(screen.getByText('25:00')).toBeInTheDocument();
        expect(screen.getByText('Start')).toBeInTheDocument();
    });
});