import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { OperationButton } from "./OperationButton";

describe("OperationButton", () => {
  it("renders with correct value", () => {
    const onClick = vi.fn();
    render(<OperationButton value="+" onClick={onClick} />);

    const button = screen.getByTestId("button-+");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("+");
  });

  it("calls onClick handler when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<OperationButton value="×" onClick={onClick} />);

    const button = screen.getByTestId("button-×");
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith("×");
  });

  it("applies operation variant styles", () => {
    const onClick = vi.fn();
    render(<OperationButton value="÷" onClick={onClick} />);

    const button = screen.getByTestId("button-÷");
    expect(button).toHaveClass("bg-gray-200");
  });

  it("applies additional className when provided", () => {
    const onClick = vi.fn();
    render(
      <OperationButton value="-" onClick={onClick} className="custom-class" />
    );

    const button = screen.getByTestId("button--");
    expect(button).toHaveClass("custom-class");
  });
});
