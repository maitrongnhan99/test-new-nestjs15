import { FC } from "react";
import { ControlButton } from "../buttons/ControlButton";
import { NumberButton } from "../buttons/NumberButton";
import { OperationButton } from "../buttons/OperationButton";
import { KeyPadRow } from "./KeyPadRow";

interface KeyPadGridProps {
  onButtonClick: (value: string) => void;
}

const KeyPadGrid: FC<KeyPadGridProps> = ({ onButtonClick }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <KeyPadRow>
        <ControlButton value="C" onClick={onButtonClick} />
        <ControlButton value="⌫" onClick={onButtonClick} />
        <OperationButton value="÷" onClick={onButtonClick} />
        <OperationButton value="×" onClick={onButtonClick} />
      </KeyPadRow>

      <KeyPadRow>
        <NumberButton value="7" onClick={onButtonClick} />
        <NumberButton value="8" onClick={onButtonClick} />
        <NumberButton value="9" onClick={onButtonClick} />
        <OperationButton value="-" onClick={onButtonClick} />
      </KeyPadRow>

      <KeyPadRow>
        <NumberButton value="4" onClick={onButtonClick} />
        <NumberButton value="5" onClick={onButtonClick} />
        <NumberButton value="6" onClick={onButtonClick} />
        <OperationButton value="+" onClick={onButtonClick} />
      </KeyPadRow>

      <KeyPadRow>
        <NumberButton value="1" onClick={onButtonClick} />
        <NumberButton value="2" onClick={onButtonClick} />
        <NumberButton value="3" onClick={onButtonClick} />
        <NumberButton
          value="0"
          onClick={onButtonClick}
          className="col-span-2"
        />
        <NumberButton value="." onClick={onButtonClick} />
        <ControlButton value="=" onClick={onButtonClick} isEquals />
      </KeyPadRow>
    </div>
  );
};

export { KeyPadGrid };
