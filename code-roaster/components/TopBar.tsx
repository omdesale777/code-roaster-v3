import React from "react";

export function TopBar({ children }: { children: React.ReactNode }) {
  return (
    <header className="border-b-2 border-frame bg-[#F7F7F5] flex flex-col md:flex-row items-stretch md:items-center justify-between px-5 py-3 md:py-2.5 gap-3 shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="font-sans font-bold text-lg md:text-xl tracking-[0.14em] uppercase text-frame select-none">
          Code Roaster
        </h1>
        <span className="text-[10px] font-mono border border-frame px-1.5 py-0.5 tracking-widest text-[#444] uppercase bg-white">
          v1.4-build
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono">
        {children}
      </div>
    </header>
  );
}
