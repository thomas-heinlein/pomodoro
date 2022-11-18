import { act } from "react-dom/test-utils";

export async function wait(milliseconds: number) {
  await act(async () => {
    await new Promise((r) => setTimeout(r, 1500));
  });
}
