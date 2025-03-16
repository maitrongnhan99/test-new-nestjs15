import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Calculator } from "./Calculator";

describe("Calculator", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<Calculator />);
    expect(getByTestId("calculator")).toBeInTheDocument();
  });

  it("displays the initial value", () => {
    const { getByTestId } = render(<Calculator />);
    expect(getByTestId("display")).toHaveTextContent("0");
  });

  it("clears the display when C button is pressed", async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(<Calculator />);

    // Add some numbers
    await user.click(getByTestId("button-5"));
    await user.click(getByTestId("button-6"));

    // Check the display shows 56
    expect(getByTestId("display")).toHaveTextContent("56");

    // Clear the display
    await user.click(getByTestId("button-C"));

    // Check the display is cleared
    expect(getByTestId("display")).toHaveTextContent("0");
  });
});
