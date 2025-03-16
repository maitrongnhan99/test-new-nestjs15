import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResultDisplay } from "./ResultDisplay";

describe("ResultDisplay", () => {
  it("renders value correctly", () => {
    render(<ResultDisplay value="123" />);
    expect(screen.getByTestId("display")).toHaveTextContent("123");
  });

  it("renders 0 when value is empty", () => {
    render(<ResultDisplay value="" />);
    expect(screen.getByTestId("display")).toHaveTextContent("0");
  });

  it("renders decimal numbers correctly", () => {
    render(<ResultDisplay value="123.45" />);
    expect(screen.getByTestId("display")).toHaveTextContent("123.45");
  });

  it("renders negative numbers correctly", () => {
    render(<ResultDisplay value="-123" />);
    expect(screen.getByTestId("display")).toHaveTextContent("-123");
  });
});
