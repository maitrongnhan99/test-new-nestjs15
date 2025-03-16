import { FC, ReactNode } from "react";

interface KeyPadRowProps {
  children: ReactNode;
}

const KeyPadRow: FC<KeyPadRowProps> = ({ children }) => {
  return <>{children}</>;
};

export { KeyPadRow };
