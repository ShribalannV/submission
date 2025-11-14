const summaryData = [
    { Test: "btn1", Expected: "Button 1 clicked", Actual: "Button 1 clicked" },
    { Test: "btn2", Expected: "Button 2 clicked", Actual: "Button 2 clicked" },
    { Test: "btn3", Expected: "Button 3 clicked", Actual: "Button 3 clicked" },
    { Test: "api-timeout", Expected: "Timeout API Response", Actual: "Timeout API Response" },
    { Test: "api-no-timeout", Expected: "No Timeout API Response", Actual: "No Timeout API Response" },
    { Test: "api-promise", Expected: "Promise API Response", Actual: "Promise API Response" },
  ];
  
  describe("Final Summary Table Output", () => {
    
    summaryData.forEach((row) => {
      test(`${row.Test} should pass`, () => {
        expect(row.Actual).toBe(row.Expected);
      });
    });
  
    test("Prints table", () => {
      console.table(
        summaryData.map((r, index) => ({
          index,
          Test: r.Test,
          Expected: r.Expected,
          Actual: r.Actual,
          Passed: r.Actual === r.Expected ? "YES" : "NO",
        }))
      );
    });
  
  });
  