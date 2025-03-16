import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ExpressionDisplay } from "./ExpressionDisplay";

describe("ExpressionDisplay", () => {
  it("renders expression correctly", () => {
    render(<ExpressionDisplay expression="5 + 10 = " />);
    const expressionElement = screen.getByTestId("expression");
    expect(expressionElement).toBeInTheDocument();
    expect(expressionElement.textContent?.trim()).toBe("5 + 10 =");
  });

  it("renders empty expression", () => {
    render(<ExpressionDisplay expression="" />);
    const expressionElement = screen.getByTestId("expression");
    expect(expressionElement).toBeInTheDocument();
    expect(expressionElement.textContent).toBe("");
  });

  it("renders long expression", () => {
    const longExpression = "123.45 + 678.9 × 10 - 50 ÷ 2 = ";
    render(<ExpressionDisplay expression={longExpression} />);
    const expressionElement = screen.getByTestId("expression");
    expect(expressionElement).toBeInTheDocument();
    expect(expressionElement.textContent?.trim()).toBe(longExpression.trim());
  });
});
