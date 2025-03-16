import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useCalculator } from "./useCalculator";

describe("useCalculator coverage tests", () => {
  // Test for line 40 (overflow error)
  it("handles overflow for large results", () => {
    // Mock a situation where Number.isFinite would return false
    const originalIsFinite = Number.isFinite;
    Number.isFinite = vi.fn().mockReturnValue(false);

    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick("1");
      result.current.handleButtonClick("+");
      result.current.handleButtonClick("2");
      result.current.handleButtonClick("=");
    });

    expect(result.current.error).toBe("Result is too large");

    // Restore original function
    Number.isFinite = originalIsFinite;
  });

  // Test for line 172 (default case in calculatorReducer)
  it("handles unknown action type", () => {
    const { result } = renderHook(() => useCalculator());

    // Simulate dispatching an unknown action
    act(() => {
      result.current.handleButtonClick("UNKNOWN_ACTION");
    });

    // The state should remain unchanged
    expect(result.current.display).toBe("0");
  });

  // Test for line 191 (default case in handleButtonClick)
  it("handles unknown button value", () => {
    const { result } = renderHook(() => useCalculator());

    // Try to click a button that doesn't exist
    act(() => {
      result.current.handleButtonClick("UNKNOWN_BUTTON");
    });

    // The state should remain unchanged
    expect(result.current.display).toBe("0");
  });

  // Tests for lines 16-117 (various calculator operations)
  it("handles all basic operations", () => {
    const { result } = renderHook(() => useCalculator());

    // Addition
    act(() => {
      result.current.handleButtonClick("5");
      result.current.handleButtonClick("+");
      result.current.handleButtonClick("3");
      result.current.handleButtonClick("=");
    });
    expect(result.current.display).toBe("8");

    // Subtraction
    act(() => {
      result.current.handleButtonClick("C");
      result.current.handleButtonClick("9");
      result.current.handleButtonClick("-");
      result.current.handleButtonClick("4");
      result.current.handleButtonClick("=");
    });
    expect(result.current.display).toBe("5");

    // Multiplication
    act(() => {
      result.current.handleButtonClick("C");
      result.current.handleButtonClick("6");
      result.current.handleButtonClick("×");
      result.current.handleButtonClick("7");
      result.current.handleButtonClick("=");
    });
    expect(result.current.display).toBe("42");

    // Division
    act(() => {
      result.current.handleButtonClick("C");
      result.current.handleButtonClick("1");
      result.current.handleButtonClick("0");
      result.current.handleButtonClick("÷");
      result.current.handleButtonClick("2");
      result.current.handleButtonClick("=");
    });
    expect(result.current.display).toBe("5");
  });

  it("handles operation without previous value", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick("+");
    });

    expect(result.current.display).toBe("0");
    expect(result.current.expression).toBe("0 + ");
  });

  it("handles equals without operation", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick("5");
      result.current.handleButtonClick("=");
    });

    expect(result.current.display).toBe("5");
  });

  // Additional tests for lines 16-117
  it("handles decimal point input", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick("5");
      result.current.handleButtonClick(".");
      result.current.handleButtonClick("2");
    });

    expect(result.current.display).toBe("5.2");
  });

  it("prevents multiple decimal points", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick("5");
      result.current.handleButtonClick(".");
      result.current.handleButtonClick("2");
      result.current.handleButtonClick(".");
      result.current.handleButtonClick("3");
    });

    expect(result.current.display).toBe("5.23");
  });

  it("handles decimal point after operation", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick("5");
      result.current.handleButtonClick("+");
      result.current.handleButtonClick(".");
      result.current.handleButtonClick("2");
    });

    expect(result.current.display).toBe("0.2");
  });

  it("handles backspace button", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick("1");
      result.current.handleButtonClick("2");
      result.current.handleButtonClick("3");
      result.current.handleButtonClick("⌫");
    });

    expect(result.current.display).toBe("12");
  });

  it("handles backspace in waiting for operand state", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick("5");
      result.current.handleButtonClick("+");
      result.current.handleButtonClick("⌫");
    });

    expect(result.current.display).toBe("5");
  });

  it("handles division by zero", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick("5");
      result.current.handleButtonClick("÷");
      result.current.handleButtonClick("0");
      result.current.handleButtonClick("=");
    });

    expect(result.current.display).toBe("NaN");
    expect(result.current.error).toBe("Cannot divide by zero");
  });

  it("handles number input after error", () => {
    const { result } = renderHook(() => useCalculator());

    // Create an error state first
    act(() => {
      result.current.handleButtonClick("1");
      result.current.handleButtonClick("÷");
      result.current.handleButtonClick("0");
      result.current.handleButtonClick("=");
    });

    // Input after error should reset
    act(() => {
      result.current.handleButtonClick("5");
    });

    expect(result.current.display).toBe("5");
    expect(result.current.error).toBeNull();
  });

  it("handles decimal point after error", () => {
    const { result } = renderHook(() => useCalculator());

    // Create an error state first
    act(() => {
      result.current.handleButtonClick("1");
      result.current.handleButtonClick("÷");
      result.current.handleButtonClick("0");
      result.current.handleButtonClick("=");
    });

    // Decimal after error should reset
    act(() => {
      result.current.handleButtonClick(".");
    });

    expect(result.current.display).toBe("0.");
    expect(result.current.error).toBeNull();
  });

  it("handles operation with error state", () => {
    const { result } = renderHook(() => useCalculator());

    // Create an error state
    act(() => {
      result.current.handleButtonClick("5");
      result.current.handleButtonClick("÷");
      result.current.handleButtonClick("0");
      result.current.handleButtonClick("=");
    });

    // Try to perform an operation in error state
    act(() => {
      result.current.handleButtonClick("+");
    });

    // Should still be in error state
    expect(result.current.error).toBe("Cannot divide by zero");
  });

  it("handles equals with error state", () => {
    const { result } = renderHook(() => useCalculator());

    // Create an error state
    act(() => {
      result.current.handleButtonClick("5");
      result.current.handleButtonClick("÷");
      result.current.handleButtonClick("0");
      result.current.handleButtonClick("=");
    });

    // Try to perform equals in error state
    act(() => {
      result.current.handleButtonClick("=");
    });

    // Should still be in error state
    expect(result.current.error).toBe("Cannot divide by zero");
  });

  // Additional tests for lines 112-128 (handleEquals function)
  it("handles equals with multiple operations", () => {
    const { result } = renderHook(() => useCalculator());

    // 5 + 3 * 2 = 16 (not 11, because we calculate sequentially)
    act(() => {
      result.current.handleButtonClick("5");
      result.current.handleButtonClick("+");
      result.current.handleButtonClick("3");
      result.current.handleButtonClick("×");
      result.current.handleButtonClick("2");
      result.current.handleButtonClick("=");
    });

    expect(result.current.display).toBe("16");
    expect(result.current.expression).toBe("8 × 2 = ");
  });

  it("handles multiple equals presses", () => {
    const { result } = renderHook(() => useCalculator());

    // 5 + 3 = 8, then = again should still be 8
    act(() => {
      result.current.handleButtonClick("5");
      result.current.handleButtonClick("+");
      result.current.handleButtonClick("3");
      result.current.handleButtonClick("=");
      result.current.handleButtonClick("=");
    });

    expect(result.current.display).toBe("8");
  });

  it("handles operation after equals", () => {
    const { result } = renderHook(() => useCalculator());

    // 5 + 3 = 8, then + 2 = 10
    act(() => {
      result.current.handleButtonClick("5");
      result.current.handleButtonClick("+");
      result.current.handleButtonClick("3");
      result.current.handleButtonClick("=");
      result.current.handleButtonClick("+");
      result.current.handleButtonClick("2");
      result.current.handleButtonClick("=");
    });

    expect(result.current.display).toBe("10");
    expect(result.current.expression).toBe("8 + 2 = ");
  });

  it("handles complex calculation sequence", () => {
    const { result } = renderHook(() => useCalculator());

    // 5 + 3 * 2 / 4 = 4
    act(() => {
      result.current.handleButtonClick("5");
      result.current.handleButtonClick("+");
      result.current.handleButtonClick("3");
      result.current.handleButtonClick("×");
      result.current.handleButtonClick("2");
      result.current.handleButtonClick("÷");
      result.current.handleButtonClick("4");
      result.current.handleButtonClick("=");
    });

    expect(result.current.display).toBe("4");
  });
});
