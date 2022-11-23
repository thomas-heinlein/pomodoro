import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import {
  expectTextInDocument,
  expectTextInDocumentWithTimeout,
  wait,
} from "./TestUtil";

describe("CountdownLabel should", () => {
  it("render 25 minutes label at the beginning", () => {
    render(<App />);
    expectTextInDocument("25:00");
  });

  it("decrements countdown after start button was pushed", async () => {
    render(<App />);
    clickStart();
    await expectTextInDocumentWithTimeout("24:59", 1500);
  });

  it("is able to pause and restart", async () => {
    render(<App />);
    clickStart();
    await wait(1500);
    clickStop();
    await wait(4000);
    clickStart();
    await wait(1500);
    await expectTextInDocumentWithTimeout("24:57", 2000);
  }, 30000);

  it("not decrements timer if start button is not pushed", async () => {
    render(<App />);
    await expectTextInDocument("25:00");
  });

  it("consider custom initial countdown value", () => {
    render(<App initialPomodoroCountdownInSeconds={2} />);
    expectTextInDocument("00:02");
  });

  it("stop decrementing timer after reaching pause", async () => {
    render(<App initialPomodoroCountdownInSeconds={1} />);
    const countdown = screen.getByText("00:01");
    clickStart();
    await wait(1500);
    expect(countdown.textContent).toBe("05:00");
  });

  const clickStart = () => {
    const startButton = screen.getByText("Start");
    fireEvent.click(startButton);
  };

  const clickStop = () => {
    const startButton = screen.getByText("Stop");
    fireEvent.click(startButton);
  };
});
