import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import App from '../App';

describe('Countdown should', () => {
    it('render 25 minutes label at the beginning', () => {
        render(<App/>);
        const countdown = screen.getByText('25:00');
        expect(countdown).toBeInTheDocument();
    });

    it('decrements countdown after start button was pushed', async () => {
        render(<App/>);
        const countdown = screen.getByText('25:00');
        const startButton = screen.getByRole('button');
        fireEvent.click(startButton);
        await waitFor(() =>
            expect(countdown.textContent).toBe('24:59'), {timeout: 1500}
        );
    });

    it('not decrements timer if start button is not pushed', async () => {
        render(<App/>);
        const countdown = screen.getByText('25:00');
        await new Promise((r) => setTimeout(r, 1500));
        expect(countdown.textContent).toBe('25:00');
    });

});

