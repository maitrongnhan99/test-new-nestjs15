import { FC } from "react";
import { CalculatorButton } from "./CalculatorButton";

interface ControlButtonProps {
  value: string;
  onClick: (value: string) => void;
  isEquals?: boolean;
  className?: string;
}

const ControlButton: FC<ControlButtonProps> = ({
  value,
  onClick,
  isEquals = false,
  className,
}) => {
  return (
    <CalculatorButton
      value={value}
      onClick={onClick}
      variant={isEquals ? "equals" : "control"}
      className={className}
    />
  );
};

export { ControlButton };
