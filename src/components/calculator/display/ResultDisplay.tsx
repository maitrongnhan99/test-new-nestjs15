import { FC } from "react";

interface ResultDisplayProps {
  value: string;
}

const ResultDisplay: FC<ResultDisplayProps> = ({ value }) => {
  return (
    <div
      className="text-right text-4xl font-bold overflow-x-auto whitespace-nowrap"
      data-testid="display"
    >
      {value || "0"}
    </div>
  );
};

export { ResultDisplay };
