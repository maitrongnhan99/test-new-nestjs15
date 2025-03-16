import { FC } from "react";
import { CalculatorButton } from "./CalculatorButton";

interface OperationButtonProps {
  value: string;
  onClick: (value: string) => void;
  className?: string;
}

const OperationButton: FC<OperationButtonProps> = ({
  value,
  onClick,
  className,
}) => {
  return (
    <CalculatorButton
      value={value}
      onClick={onClick}
      variant="operation"
      className={className}
    />
  );
};

export { OperationButton };
