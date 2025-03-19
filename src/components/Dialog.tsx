import { ReactNode } from "react";

interface DialogProps {
  open: boolean;
  children: ReactNode;
}

function Dialog({ children, open }: DialogProps) {
  if (open)
    return (
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-50`}
      >
        <div className="bg-white rounded-lg shadow-xl w-full relative animate-fadeIn">
          {children}
        </div>
      </div>
    );
  return null;
}

export default Dialog;
