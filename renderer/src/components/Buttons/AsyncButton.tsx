import React from "react";
import { RiLoaderLine } from "react-icons/ri";
import clsx from "clsx";

interface Props {
  title: string;
  onClick?: () => void;
  isLoading: boolean;
  isDisabled?: boolean;
}

const Loading = () => (
  <div className="animate-spin">
    <RiLoaderLine size="1.2rem" />
  </div>
);

function AsyncButton({ isLoading, onClick, title, isDisabled = false }: Props) {
  return (
    <button
      type="submit"
      disabled={isLoading || isDisabled}
      className={clsx(
        "flex items-center justify-center w-full h-12 p-2 text-white rounded outline-none focus:ring-2 ring-offset-1 ring-sky-400",
        isDisabled || isLoading
          ? "bg-neutral-300 cursor-not-allowed"
          : "bg-sky-400 hover:bg-sky-500"
      )}
      onClick={onClick}
    >
      {isLoading ? <Loading /> : title}
    </button>
  );
}

export default AsyncButton;
