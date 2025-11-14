import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../App";

describe("Button Action Tests", () => {
  test("Button 1 works", async () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("btn1"));
    const res = await screen.findByTestId("status");
    expect(res.textContent).toBe("Button 1 clicked");
  });

  test("Button 2 works", async () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("btn2"));
    const res = await screen.findByTestId("status");
    expect(res.textContent).toBe("Button 2 clicked");
  });

  test("Button 3 works", async () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("btn3"));
    const res = await screen.findByTestId("status");
    expect(res.textContent).toBe("Button 3 clicked");
  });
});
