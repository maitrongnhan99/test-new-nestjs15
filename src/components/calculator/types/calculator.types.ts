export type Operation = "+" | "-" | "×" | "÷" | null;

export type CalculatorState = {
  display: string;
  expression: string;
  prevValue: string | null;
  operation: Operation;
  waitingForOperand: boolean;
  error: string | null;
};

export type CalculatorAction =
  | { type: "NUMBER_INPUT"; value: string }
  | { type: "DECIMAL_POINT" }
  | { type: "OPERATION"; operation: string }
  | { type: "EQUALS" }
  | { type: "CLEAR" }
  | { type: "BACKSPACE" };

export type ButtonVariant = "number" | "operation" | "control" | "equals";
