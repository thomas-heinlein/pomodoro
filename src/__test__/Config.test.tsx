import { act, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import {
  configAreaTestId,
  configButtonTestId,
  configDialogBreakInputTestId,
  configDialogPomodoroInputTestId,
  configDialogSaveButtonId,
} from "../components/TestId";
import React from "react";
import userEvent from "@testing-library/user-event";
import {
  expectTextInDocument,
  expectInField,
  setInput,
  expectTestIdNotInDocument,
  expectTestIdInDocument,
} from "./TestUtil";

describe("Config should", () => {
  it("display a button", () => {
    render(<App />);
    expectTestIdInDocument(configButtonTestId);
  });

  it("not display config area initially", () => {
    render(<App />);
    expectTestIdNotInDocument(configAreaTestId);
  });

  it("display config area after clicking config button", async () => {
    render(<App />);
    await clickConfigButton();
    await expectTestIdInDocument(configAreaTestId);
  });

  it("hides config area after clicking cancel button", async () => {
    render(<App />);
    await clickConfigButton();
    await clickCancelButton();

    await expectTestIdNotInDocument(configAreaTestId);
  });

  it("renders 25 minutes in pomodoro input field", async () => {
    render(<App />);
    await clickConfigButton();
    await expectInField(configDialogPomodoroInputTestId, "25");
  });

  it("renders 5 minutes in break input field", async () => {
    render(<App />);
    await clickConfigButton();
    await expectInField(configDialogBreakInputTestId, "5");
  });

  it("change pomodoro time to 7 minutes after entering text in input and saving", async () => {
    render(<App />);
    await clickConfigButton();
    await setInput(configDialogPomodoroInputTestId, "7");
    await clickSaveButton();
    await expectTextInDocument("07:00");
  });

  it("not change pomodoro time after entering text in input and canceling", async () => {
    render(<App />);
    await clickConfigButton();
    await setInput(configDialogPomodoroInputTestId, "7");
    await clickCancelButton();
    await expectTextInDocument("25:00");
  });

  it("change break time to 5 minutes after entering text in input and saving", async () => {
    render(<App startWithBreak={true} />);
    await clickConfigButton();
    await setInput(configDialogBreakInputTestId, "5");
    await clickSaveButton();
    await expectTextInDocument("05:00");
  });

  const clickConfigButton = async () => {
    await userEvent.click(screen.getByTestId(configButtonTestId));
  };

  const clickCancelButton = async () => {
    await act(async () => {
      await userEvent.click(screen.getByText("Cancel"));
    });
  };

  const clickSaveButton = async () => {
    await act(async () => {
      await userEvent.click(screen.getByTestId(configDialogSaveButtonId));
    });
  };
});
