import { FC } from "react";

interface CalculatorButtonProps {
  value: string;
  onClick: (value: string) => void;
  variant?: "number" | "operation" | "control" | "equals";
  className?: string;
}

const CalculatorButton: FC<CalculatorButtonProps> = ({
  value,
  onClick,
  variant = "number",
  className = "",
}) => {
  const baseClasses =
    "flex items-center justify-center h-16 rounded-lg text-2xl font-medium transition-colors";

  const variantClasses = {
    number:
      "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700",
    operation:
      "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600",
    control: "bg-red-400 hover:bg-red-500 text-white",
    equals: "bg-blue-500 hover:bg-blue-600 text-white",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={() => onClick(value)}
      data-testid={`button-${value}`}
    >
      {value}
    </button>
  );
};

export { CalculatorButton };
