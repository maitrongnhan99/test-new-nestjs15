import { useCallback, useReducer } from "react";
import {
  CalculatorAction,
  CalculatorState,
  Operation,
} from "../types/calculator.types";

const createInitialState = (initialValue?: string): CalculatorState => ({
  display: initialValue || "0",
  expression: "",
  prevValue: null,
  operation: null,
  waitingForOperand: false,
  error: null,
});

const calculateResult = (
  currentValue: number,
  inputValue: number,
  operation: string
): { result: number; error: string | null } => {
  try {
    let result: number;
    switch (operation) {
      case "+":
        result = currentValue + inputValue;
        break;
      case "-":
        result = currentValue - inputValue;
        break;
      case "×":
        result = currentValue * inputValue;
        break;
      case "÷":
        if (inputValue === 0) {
          return { result: NaN, error: "Cannot divide by zero" };
        }
        result = currentValue / inputValue;
        break;
      default:
        result = inputValue;
    }

    if (!Number.isFinite(result)) {
      return { result: 0, error: "Result is too large" };
    }

    return { result, error: null };
  } catch (err: unknown) {
    return {
      result: 0,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
};

const getDisplayValue = (
  currentDisplay: string,
  newValue: string,
  isWaiting: boolean
): string => {
  if (isWaiting) return newValue;
  if (currentDisplay === "0") return newValue;
  return currentDisplay + newValue;
};

const handleNumberInput = (
  state: CalculatorState,
  value: string
): CalculatorState => {
  if (state.error) {
    return { ...createInitialState(), display: value };
  }
  return {
    ...state,
    display: getDisplayValue(state.display, value, state.waitingForOperand),
    waitingForOperand: false,
    error: null,
  };
};

const handleDecimalPoint = (state: CalculatorState): CalculatorState => {
  if (state.error) {
    return { ...createInitialState(), display: "0." };
  }
  if (state.waitingForOperand) {
    return { ...state, display: "0.", waitingForOperand: false, error: null };
  }
  if (state.display.indexOf(".") === -1) {
    return { ...state, display: state.display + ".", error: null };
  }
  return state;
};

const handleOperation = (
  state: CalculatorState,
  operation: string,
  currentValue: number,
  inputValue: number
): CalculatorState => {
  if (state.error) return state;
  if (state.prevValue === null) {
    return {
      ...state,
      prevValue: state.display,
      operation: operation as Operation,
      expression: `${state.display} ${operation} `,
      waitingForOperand: true,
      error: null,
    };
  }
  if (!state.operation) return state;

  const calcResult = calculateResult(currentValue, inputValue, state.operation);
  if (calcResult.error) {
    return { ...state, display: state.display, error: calcResult.error };
  }

  return {
    ...state,
    prevValue: String(calcResult.result),
    display: String(calcResult.result),
    expression: `${calcResult.result} ${operation} `,
    operation: operation as Operation,
    waitingForOperand: true,
    error: null,
  };
};

const handleEquals = (
  state: CalculatorState,
  currentValue: number,
  inputValue: number
): CalculatorState => {
  if (state.error || !state.operation || state.prevValue === null) return state;

  const calcResult = calculateResult(currentValue, inputValue, state.operation);
  if (calcResult.error) {
    return {
      ...state,
      display: isNaN(calcResult.result) ? "NaN" : String(calcResult.result),
      error: calcResult.error,
    };
  }

  return {
    ...state,
    display: String(calcResult.result),
    expression: `${state.prevValue} ${state.operation} ${state.display} = `,
    prevValue: null,
    operation: null,
    waitingForOperand: true,
    error: null,
  };
};

const handleBackspace = (state: CalculatorState): CalculatorState => {
  if (state.error || state.waitingForOperand) return state;
  return {
    ...state,
    display: state.display.length > 1 ? state.display.slice(0, -1) : "0",
    error: null,
  };
};

const calculatorReducer = (
  state: CalculatorState,
  action: CalculatorAction
): CalculatorState => {
  const inputValue = state.display
    ? parseFloat(Number(state.display).toString())
    : 0;
  const currentValue = state.prevValue
    ? parseFloat(Number(state.prevValue).toString())
    : 0;

  switch (action.type) {
    case "NUMBER_INPUT":
      return handleNumberInput(state, action.value);
    case "DECIMAL_POINT":
      return handleDecimalPoint(state);
    case "OPERATION":
      return handleOperation(state, action.operation, currentValue, inputValue);
    case "EQUALS":
      return handleEquals(state, currentValue, inputValue);
    case "CLEAR":
      return createInitialState();
    case "BACKSPACE":
      return handleBackspace(state);
    default:
      return state;
  }
};

const useCalculator = (initialValue?: string) => {
  const [state, dispatch] = useReducer(
    calculatorReducer,
    createInitialState(initialValue)
  );

  const handleButtonClick = useCallback((value: string) => {
    switch (value) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        dispatch({ type: "NUMBER_INPUT", value });
        break;
      case ".":
        dispatch({ type: "DECIMAL_POINT" });
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
        dispatch({ type: "OPERATION", operation: value });
        break;
      case "=":
      case "Enter":
        dispatch({ type: "EQUALS" });
        break;
      case "C":
        dispatch({ type: "CLEAR" });
        break;
      case "⌫":
        dispatch({ type: "BACKSPACE" });
        break;
    }
  }, []);

  return {
    display: state.display,
    expression: state.expression,
    error: state.error,
    handleButtonClick,
  };
};

export { useCalculator };
