import React from "react";

const Button = ({
  primary,
  onClick,
  text,
}: {
  primary: boolean;
  onClick: any;
  text: string;
}) => {
  return (
    <>
      {primary ? (
        <button
          className="rounded border border-indigo-600 bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          onClick={onClick}
        >
          <span>{text}</span>
        </button>
      ) : (
        <button
          className="rounded border border-indigo-600 px-4 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
          onClick={onClick}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
