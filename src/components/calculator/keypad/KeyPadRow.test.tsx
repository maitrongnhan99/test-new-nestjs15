import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { KeyPadRow } from "./KeyPadRow";

describe("KeyPadRow", () => {
  it("renders children correctly", () => {
    render(
      <KeyPadRow>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </KeyPadRow>
    );

    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
  });
});
