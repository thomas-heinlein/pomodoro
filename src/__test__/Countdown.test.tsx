import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import App from '../App';

describe('CountdownLabel should', () => {

    it('render 25 minutes label at the beginning', () => {
        render(<App/>);
        const countdown = getCountdown();
        expect(countdown).toBeInTheDocument();
    });

    it('decrements countdown after start button was pushed', async () => {
        render(<App/>);
        const countdown = getCountdown();
        clickStart();
        await waitFor(() =>
            expect(countdown.textContent).toBe('24:59'), {timeout: 1500}
        );
    });

    it('not decrements timer if start button is not pushed', async () => {
        render(<App/>);
        const countdown = getCountdown();
        waitAndExpect(1500, () => {
            expect(countdown.textContent).toBe('25:00');
        });
    });

    it('consider initial countdown value', () => {
        render(<App initialCountdownInSeconds={2}/>);
        const countdown = screen.getByText('00:02');
        expect(countdown).toBeInTheDocument();
    });

    it('stop decrementing timer at 0', async () => {
        render(<App initialCountdownInSeconds={1}/>);
        const countdown = screen.getByText('00:01');
        clickStart();
        waitAndExpect(3000, () => {
            expect(countdown.textContent).toBe('00:00');
        });
    });

    const getCountdown = () => {
        return screen.getByText('25:00');
    };

    const clickStart = () => {
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
    };

    const waitAndExpect = (waitTime: number, expectAfterWaitTime: () => void) => {
        setTimeout(expectAfterWaitTime, waitTime);
    }
});

