import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { expectTextInDocument } from "./TestUtil";

describe("Start/Stop button should", () => {
  it("render Start label initially", () => {
    render(<App />);
    expectTextInDocument("Start");
  });

  it("show Stop button label after clicking Start", () => {
    render(<App />);
    const startButton = screen.getByText("Start");
    fireEvent.click(startButton);
    expectTextInDocument("Stop");
  });

  it("show Start button label after double clicking Start", () => {
    render(<App />);
    const startButton = screen.getByText("Start");
    fireEvent.click(startButton);
    fireEvent.click(startButton);
    expectTextInDocument("Start");
  });
});
