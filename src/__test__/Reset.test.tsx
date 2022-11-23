import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import {
  expectTextInDocument,
  expectTextInDocumentWithTimeout,
} from "./TestUtil";

describe("Reset Button should", () => {
  it("be visible with default countdown", () => {
    render(<App />);
    expectTextInDocument("Reset");
  });

  it("be visible when countdown is 0", () => {
    render(<App initialPomodoroCountdownInSeconds={0} />);
    expectTextInDocument("Reset");
  });

  it("reset countdown and start button to default when clicked", async () => {
    render(<App />);

    const countdown = screen.getByText("25:00");
    const resetButton = screen.getByText("Reset");
    const startButton = screen.getByText("Start");

    await clickStartWaitAndClickReset(
      startButton,
      countdown,
      resetButton,
      "24:59"
    );

    await expectTextInDocument("Start");
    await expectTextInDocument("25:00");
  });

  it("reset countdown and start button to initially set value when clicked", async () => {
    render(<App initialPomodoroCountdownInSeconds={20} />);

    const countdown = screen.getByText("00:20");
    const resetButton = screen.getByText("Reset");
    const startButton = screen.getByText("Start");

    await clickStartWaitAndClickReset(
      startButton,
      countdown,
      resetButton,
      "00:19"
    );

    await expectTextInDocument("Start");
    await expectTextInDocument("00:20");
  });

  it("start work mode on reset", () => {
    render(<App startWithBreak={true} />);
    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);
    expectTextInDocument("25:00");
  });

  async function clickStartWaitAndClickReset(
    startButton: HTMLElement,
    countdown: HTMLElement,
    resetButton: HTMLElement,
    expectedCountdownTime: string
  ) {
    fireEvent.click(startButton);
    await expectTextInDocumentWithTimeout(expectedCountdownTime, 1500);
    fireEvent.click(resetButton);
  }
});
