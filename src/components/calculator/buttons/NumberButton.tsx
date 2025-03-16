import { FC } from "react";
import { CalculatorButton } from "./CalculatorButton";

interface NumberButtonProps {
  value: string;
  onClick: (value: string) => void;
  className?: string;
}

const NumberButton: FC<NumberButtonProps> = ({ value, onClick, className }) => {
  return (
    <CalculatorButton
      value={value}
      onClick={onClick}
      variant="number"
      className={className}
    />
  );
};

export { NumberButton };
