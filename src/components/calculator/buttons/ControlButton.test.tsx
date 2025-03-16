import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ControlButton } from "./ControlButton";

describe("ControlButton", () => {
  it("renders with correct value", () => {
    const onClick = vi.fn();
    render(<ControlButton value="C" onClick={onClick} />);

    const button = screen.getByTestId("button-C");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("C");
  });

  it("calls onClick handler when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<ControlButton value="⌫" onClick={onClick} />);

    const button = screen.getByTestId("button-⌫");
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith("⌫");
  });

  it("applies control variant styles by default", () => {
    const onClick = vi.fn();
    render(<ControlButton value="C" onClick={onClick} />);

    const button = screen.getByTestId("button-C");
    expect(button).toHaveClass("bg-red-400");
  });

  it("applies equals variant styles when isEquals is true", () => {
    const onClick = vi.fn();
    render(<ControlButton value="=" onClick={onClick} isEquals={true} />);

    const button = screen.getByTestId("button-=");
    expect(button).toHaveClass("bg-blue-500");
  });

  it("applies additional className when provided", () => {
    const onClick = vi.fn();
    render(
      <ControlButton value="C" onClick={onClick} className="custom-class" />
    );

    const button = screen.getByTestId("button-C");
    expect(button).toHaveClass("custom-class");
  });
});
