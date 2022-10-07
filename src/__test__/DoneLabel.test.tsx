import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '../App';

describe('Done Label should', () => {

    it('not show label when countdown is set to default value', () => {
        render(<App/>);
        expect(screen.queryByText("Done")).not.toBeInTheDocument();
    });

    it('show label when countdown is set to 0', () => {
        render(<App initialCountdownInSeconds={0}/>);
        const doneLabel = screen.getByText('Done');
        expect(doneLabel).toBeInTheDocument();
    });
});