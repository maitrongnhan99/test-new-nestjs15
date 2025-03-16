import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DisplayScreen } from "./DisplayScreen";

describe("DisplayScreen", () => {
  it("renders expression and value correctly", () => {
    render(<DisplayScreen value="123" expression="100 + 23 = " />);

    // Check if the expression is rendered
    const expressionElement = screen.getByTestId("expression");
    expect(expressionElement).toBeInTheDocument();
    expect(expressionElement.textContent?.trim()).toBe("100 + 23 =");

    // Check if the value is rendered
    expect(screen.getByTestId("display")).toHaveTextContent("123");
  });

  it("renders with empty expression", () => {
    render(<DisplayScreen value="0" expression="" />);

    // Expression should be empty
    const expressionElement = screen.getByTestId("expression");
    expect(expressionElement).toBeInTheDocument();
    expect(expressionElement.textContent).toBe("");

    // Value should be 0
    expect(screen.getByTestId("display")).toHaveTextContent("0");
  });
});
