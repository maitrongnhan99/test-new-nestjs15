import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CalculatorButton } from "./CalculatorButton";

describe("CalculatorButton", () => {
  it("renders with correct value", () => {
    const onClick = vi.fn();
    render(<CalculatorButton value="5" onClick={onClick} />);

    const button = screen.getByTestId("button-5");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("5");
  });

  it("calls onClick handler when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<CalculatorButton value="7" onClick={onClick} />);

    const button = screen.getByTestId("button-7");
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith("7");
  });

  it("applies number variant styles by default", () => {
    const onClick = vi.fn();
    render(<CalculatorButton value="9" onClick={onClick} />);

    const button = screen.getByTestId("button-9");
    expect(button).toHaveClass("bg-gray-100");
  });

  it("applies operation variant styles when specified", () => {
    const onClick = vi.fn();
    render(
      <CalculatorButton value="+" onClick={onClick} variant="operation" />
    );

    const button = screen.getByTestId("button-+");
    expect(button).toHaveClass("bg-gray-200");
  });

  it("applies control variant styles when specified", () => {
    const onClick = vi.fn();
    render(<CalculatorButton value="C" onClick={onClick} variant="control" />);

    const button = screen.getByTestId("button-C");
    expect(button).toHaveClass("bg-red-400");
  });

  it("applies equals variant styles when specified", () => {
    const onClick = vi.fn();
    render(<CalculatorButton value="=" onClick={onClick} variant="equals" />);

    const button = screen.getByTestId("button-=");
    expect(button).toHaveClass("bg-blue-500");
  });

  it("applies additional className when provided", () => {
    const onClick = vi.fn();
    render(
      <CalculatorButton value="0" onClick={onClick} className="col-span-2" />
    );

    const button = screen.getByTestId("button-0");
    expect(button).toHaveClass("col-span-2");
  });
});
