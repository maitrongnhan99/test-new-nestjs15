import { FC } from "react";

interface ExpressionDisplayProps {
  expression: string;
}

const ExpressionDisplay: FC<ExpressionDisplayProps> = ({ expression }) => {
  return (
    <div
      className="text-right text-gray-500 dark:text-gray-400 text-base h-8 overflow-hidden"
      data-testid="expression"
    >
      {expression}
    </div>
  );
};

export { ExpressionDisplay };
