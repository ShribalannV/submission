import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import App from "../App";

describe("API Tests", () => {
  beforeAll(() => {
    jest.useFakeTimers(); // mock all timers
  });

  afterAll(() => {
    jest.useRealTimers(); // cleanup
  });

  test("Timeout API works", async () => {
    render(<App />);

    fireEvent.click(screen.getByTestId("api-timeout"));

    // fast-forward all timers
    act(() => {
      jest.runAllTimers();
    });

    const res = await screen.findByTestId("status");
    expect(res.textContent).toBe("Timeout API Response");
  });

  test("No Timeout API works", async () => {
    render(<App />);

    fireEvent.click(screen.getByTestId("api-no-timeout"));

    act(() => {
      jest.runAllTimers();
    });

    const res = await screen.findByTestId("status");
    expect(res.textContent).toBe("No Timeout API Response");
  });

  test("Promise API works", async () => {
    render(<App />);

    fireEvent.click(screen.getByTestId("api-promise"));

    act(() => {
      jest.runAllTimers();
    });

    const res = await screen.findByTestId("status");
    expect(res.textContent).toBe("Promise API Response");
  });
});
