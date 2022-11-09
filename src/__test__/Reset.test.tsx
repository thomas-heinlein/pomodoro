import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import App from '../App';
import {workIconTestId} from "../components/TestId";

describe('Reset Button should', () => {

    it('be visible with default countdown', () => {
        render(<App/>);
        const resetButton = screen.getByText('Reset');
        expect(resetButton).toBeInTheDocument();
    });

    it('be visible when countdown is 0', () => {
        render(<App initialPomodoroCountdownInSeconds={0}/>);
        const resetButton = screen.getByText('Reset');
        expect(resetButton).toBeInTheDocument();
    });

    async function clickStartWaitAndClickReset(
        startButton: HTMLElement,
        countdown: HTMLElement,
        resetButton: HTMLElement,
        expectedCountdownTime: string
    ) {
        fireEvent.click(startButton);

        await waitFor(async () =>
            expect(countdown.textContent).toBe(expectedCountdownTime), {timeout: 1500}
        );

        fireEvent.click(resetButton);
    }

    it('reset countdown and start button to default when clicked', async () => {
        render(<App/>);

        const countdown = screen.getByText('25:00');
        const resetButton = screen.getByText('Reset');
        const startButton = screen.getByText('Start');

        await clickStartWaitAndClickReset(startButton, countdown, resetButton, '24:59');

        expect(startButton.textContent).toBe('Start');
        expect(countdown.textContent).toBe('25:00');
    });

    it('reset countdown and start button to initially set value when clicked', async () => {
        render(<App initialPomodoroCountdownInSeconds={20}/>);

        const countdown = screen.getByText('00:20');
        const resetButton = screen.getByText('Reset');
        const startButton = screen.getByText('Start');

        await clickStartWaitAndClickReset(startButton, countdown, resetButton, '00:19');

        expect(startButton.textContent).toBe('Start');
        expect(countdown.textContent).toBe('00:20');
    });

    it('start work mode on reset', () => {
        render(<App startWithBreak={true}/>);
        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);
        expect(screen.getByTestId(workIconTestId)).toBeInTheDocument();
    });

});