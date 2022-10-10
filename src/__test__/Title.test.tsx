import App from '../App';
import {fireEvent, render, screen, waitFor} from "@testing-library/react";

describe("Document title should", () => {

    it("be set to default time initially", () => {
        render(<App/>);
        expect(document.title).toBe('25:00');
    });

    it("decrements after 1 second to 24:59", async () => {
        render(<App/>);
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        await waitFor(async () =>
            expect(document.title).toBe("24:59"), {timeout: 1500}
        );
    });

    it("consider custom initial countdown value in document title", () => {
        render(<App initialCountdownInSeconds={5}/>);
        expect(document.title).toBe('00:05');
    });

    it("stop decrementing countdown in document title when reaching 0", () => {
        render(<App initialCountdownInSeconds={1}/>);

        waitAndExpect(3000, () => {
            expect(document.title).toBe('00:00');
        });
    });

    const waitAndExpect = (waitTime: number, expectAfterWaitTime: () => void) => {
        setTimeout(expectAfterWaitTime, waitTime);
    }

});