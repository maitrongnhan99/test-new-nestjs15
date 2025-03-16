import { FC } from "react";
import { ExpressionDisplay } from "./ExpressionDisplay";
import { ResultDisplay } from "./ResultDisplay";

interface DisplayScreenProps {
  value: string;
  expression: string;
}

const DisplayScreen: FC<DisplayScreenProps> = ({ value, expression }) => {
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
      <ExpressionDisplay expression={expression} />
      <ResultDisplay value={value} />
    </div>
  );
};

export { DisplayScreen };
