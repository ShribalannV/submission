import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../App";

test("6 tests: 3 button actions + 3 APIs", async () => {
  render(<App />);

  const results = [];

  // 3 BUTTON TEST CASES
  const buttonTests = [
    { id: "btn1", expected: "Button 1 clicked" },
    { id: "btn2", expected: "Button 2 clicked" },
    { id: "btn3", expected: "Button 3 clicked" },
  ];

  for (const t of buttonTests) {
    fireEvent.click(screen.getByTestId(t.id));
    const res = await screen.findByTestId("status");

    results.push({
      Test: t.id,
      Expected: t.expected,
      Actual: res.textContent,
      Passed: res.textContent === t.expected ? "YES" : "NO",
    });
  }

  // API TIMEOUT
  fireEvent.click(screen.getByTestId("api-timeout"));
  const r1 = await screen.findByTestId("status");
  results.push({
    Test: "api-timeout",
    Expected: "Timeout API Response",
    Actual: r1.textContent,
    Passed: r1.textContent === "Timeout API Response" ? "YES" : "NO",
  });

  // API NO TIMEOUT
  fireEvent.click(screen.getByTestId("api-no-timeout"));
  const r2 = await screen.findByTestId("status");
  results.push({
    Test: "api-no-timeout",
    Expected: "No Timeout API Response",
    Actual: r2.textContent,
    Passed: r2.textContent === "No Timeout API Response" ? "YES" : "NO",
  });

  // API PROMISE
  fireEvent.click(screen.getByTestId("api-promise"));
  const r3 = await screen.findByTestId("status");
  results.push({
    Test: "api-promise",
    Expected: "Promise API Response",
    Actual: r3.textContent,
    Passed: r3.textContent === "Promise API Response" ? "YES" : "NO",
  });

  // PRINT TABLE
  console.table(results);
});
