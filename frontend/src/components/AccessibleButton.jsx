import React from "react";

function AccessibleButton({ children, className = "", ...props }) {
  return (
    <button
      className={
        "rounded-xl px-4 py-2 text-sm font-medium bg-cyan-500 text-slate-900 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-slate-950 disabled:opacity-60 " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}

export default AccessibleButton;
