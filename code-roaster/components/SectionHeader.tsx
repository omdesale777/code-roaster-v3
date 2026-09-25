import type { ReactNode } from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: ReactNode; // optional content on the right side
}

// The "01 // ROAST" style heading used by every section of the report.
export function SectionHeader({ number, title, children }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-frame pb-1">
      <h3 className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-frame">
        {String(number).padStart(2, "0")} {"//"} {title}
      </h3>
      {children}
    </div>
  );
}
