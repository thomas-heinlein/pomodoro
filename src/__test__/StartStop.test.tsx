import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from '../App';

describe("Start/Stop button should", () => {
    it('render Start label initially', () => {
        render(<App/>);
        const startButton = screen.getByText('Start');
        expect(startButton).toBeInTheDocument();
        expect(startButton.textContent).toBe('Start');
    });

    it('show Stop button label after clicking Start', () => {
        render(<App/>);
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        expect(startButton.textContent).toBe('Stop');
    });

    it('show Start button label after double clicking Start', () => {
        render(<App/>);
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        fireEvent.click(startButton);
        expect(startButton.textContent).toBe('Start');
    });
});