import { act } from "react-dom/test-utils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const defaultTimeout = 1500;

export const wait = async (milliseconds: number) => {
  await act(async () => {
    await new Promise((r) => setTimeout(r, milliseconds));
  });
};

export const setInput = async (testId: string, value: string) => {
  let pomodoroInput = screen
    .queryByTestId(testId)!
    .querySelector("input") as HTMLInputElement;

  await userEvent.clear(pomodoroInput);
  await userEvent.paste(pomodoroInput, value);
};

export const expectTextInDocument = async (expectedText: string) => {
  await expectTextInDocumentWithTimeout(expectedText, defaultTimeout);
};

export const expectTextInDocumentWithTimeout = async (
  expectedText: string,
  timeout: number
) => {
  await waitFor(
    async () => expect(screen.getByText(expectedText)).toBeInTheDocument(),
    {
      timeout: timeout || 1500,
    }
  );
};

export const expectTextNotInDocument = async (expectedText: string) => {
  await expectTextNotInDocumentWithTimeout(expectedText, defaultTimeout);
};

export const expectTextNotInDocumentWithTimeout = async (
  expectedText: string,
  timeout: number
) => {
  await waitFor(
    async () =>
      expect(screen.queryByText(expectedText)).not.toBeInTheDocument(),
    {
      timeout: timeout || 1500,
    }
  );
};

export const expectTestIdInDocument = async (testId: string) => {
  await expectTestIdInDocumentWithTimeout(testId, defaultTimeout);
};

export const expectTestIdInDocumentWithTimeout = async (
  testId: string,
  timeout: number
) => {
  await waitFor(
    async () => expect(screen.getByTestId(testId)).toBeInTheDocument(),
    {
      timeout: timeout || 1500,
    }
  );
};

export const expectTestIdNotInDocument = async (testId: string) => {
  await expectTestIdNotInDocumentWithTimeout(testId, defaultTimeout);
};

export const expectTestIdNotInDocumentWithTimeout = async (
  testId: string,
  timeout: number
) => {
  await waitFor(
    async () => expect(screen.queryByTestId(testId)).not.toBeInTheDocument(),
    {
      timeout: timeout || 1500,
    }
  );
};

export const expectInField = async (testId: string, expected: string) => {
  await waitFor(async () => {
    let input = screen.queryByTestId(testId)!.querySelector("input");
    expect(input!.value).toBe(expected);
  });
};
