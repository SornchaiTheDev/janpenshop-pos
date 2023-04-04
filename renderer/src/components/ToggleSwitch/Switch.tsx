import clsx from "clsx";
import React from "react";

interface Props {
  title: string;
  active: boolean;
  onClick: () => void;
}
function Switch({ title, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex-1 px-4 py-1 text-sm",
        active && "bg-white rounded-full shadow-md"
      )}
    >
      {title}
    </button>
  );
}

export default Switch;
