import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import App from '../App';

describe("Start/Stop button should", () => {
    it('renders Start label initially', () => {
        render(<App/>);
        const startButton = screen.getByRole('button');
        expect(startButton).toBeInTheDocument();
        expect(startButton.textContent).toBe('Start');
    });

    it('shows Stop button label after clicking Start', () => {
        render(<App/>);
        const startButton = screen.getByRole('button');
        fireEvent.click(startButton);
        expect(startButton.textContent).toBe('Stop');
    });

    it('shows Start button label after double clicking Start', () => {
        render(<App/>);
        const startButton = screen.getByRole('button');
        fireEvent.click(startButton);
        fireEvent.click(startButton);
        expect(startButton.textContent).toBe('Start');
    });
});