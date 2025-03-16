import { FC } from "react";
import { DisplayScreen } from "./display/DisplayScreen";
import { useCalculator } from "./hooks/useCalculator";
import { KeyPadGrid } from "./keypad/KeyPadGrid";

const Calculator: FC = () => {
  const { display, expression, handleButtonClick } = useCalculator();

  return (
    <div
      className="min-w-[500px] mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg"
      data-testid="calculator"
    >
      <DisplayScreen value={display} expression={expression} />
      <KeyPadGrid onButtonClick={handleButtonClick} />
    </div>
  );
};

export { Calculator };
