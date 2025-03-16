import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { KeyPadGrid } from "./KeyPadGrid";

describe("KeyPadGrid", () => {
  it("renders all calculator buttons", () => {
    const onButtonClick = vi.fn();
    render(<KeyPadGrid onButtonClick={onButtonClick} />);

    // Check for number buttons
    for (let i = 0; i <= 9; i++) {
      expect(screen.getByTestId(`button-${i}`)).toBeInTheDocument();
    }

    // Check for operation buttons
    expect(screen.getByTestId("button-+")).toBeInTheDocument();
    expect(screen.getByTestId("button--")).toBeInTheDocument();
    expect(screen.getByTestId("button-×")).toBeInTheDocument();
    expect(screen.getByTestId("button-÷")).toBeInTheDocument();

    // Check for control buttons
    expect(screen.getByTestId("button-C")).toBeInTheDocument();
    expect(screen.getByTestId("button-⌫")).toBeInTheDocument();
    expect(screen.getByTestId("button-=")).toBeInTheDocument();

    // Check for decimal point
    expect(screen.getByTestId("button-.")).toBeInTheDocument();
  });

  it("calls onButtonClick with correct value when a button is clicked", async () => {
    const onButtonClick = vi.fn();
    const user = userEvent.setup();
    render(<KeyPadGrid onButtonClick={onButtonClick} />);

    // Click on number button
    await user.click(screen.getByTestId("button-5"));
    expect(onButtonClick).toHaveBeenCalledWith("5");

    // Click on operation button
    await user.click(screen.getByTestId("button-+"));
    expect(onButtonClick).toHaveBeenCalledWith("+");

    // Click on control button
    await user.click(screen.getByTestId("button-C"));
    expect(onButtonClick).toHaveBeenCalledWith("C");
  });
});
