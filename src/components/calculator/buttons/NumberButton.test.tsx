import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NumberButton } from "./NumberButton";

describe("NumberButton", () => {
  it("renders with correct value", () => {
    const onClick = vi.fn();
    render(<NumberButton value="5" onClick={onClick} />);

    const button = screen.getByTestId("button-5");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("5");
  });

  it("calls onClick handler when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<NumberButton value="7" onClick={onClick} />);

    const button = screen.getByTestId("button-7");
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith("7");
  });

  it("applies number variant styles", () => {
    const onClick = vi.fn();
    render(<NumberButton value="9" onClick={onClick} />);

    const button = screen.getByTestId("button-9");
    expect(button).toHaveClass("bg-gray-100");
  });

  it("applies additional className when provided", () => {
    const onClick = vi.fn();
    render(<NumberButton value="0" onClick={onClick} className="col-span-2" />);

    const button = screen.getByTestId("button-0");
    expect(button).toHaveClass("col-span-2");
  });
});
