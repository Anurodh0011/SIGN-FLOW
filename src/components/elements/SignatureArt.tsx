import React from "react";

export function SignatureArt({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-full max-w-[200px] h-12 text-slate-900 ${className}`}
      viewBox="0 0 240 80"
    >
      <path
        d="M10 57C26 25 31 22 35 57s13-36 19-22-5 36 8 11c12-22 19-34 13 3-3 21 10-10 15-7 6 3-7 17 5 14 17-5 23-23 31-18 5 4-14 18-4 17 15-2 24-15 29-11 6 5-13 16-2 13 17-5 20-10 30-8 11 2 22 0 48-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default SignatureArt;
