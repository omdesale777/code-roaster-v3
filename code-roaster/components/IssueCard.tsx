import React from "react";

interface IssueCardProps {
  severity: "FATAL BUG" | "CODE SMELL" | "OPTIMIZATION";
  line: number;
  title: string;
  codeSnippet: string;
  diagnosis: React.ReactNode;
  expected: React.ReactNode;
}

export function IssueCard({ severity, line, title, codeSnippet, diagnosis, expected }: IssueCardProps) {
  return (
    <article className="space-y-2">
      <div className="flex items-center justify-between border-b border-frame pb-1">
        <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-frame">
          02 // WHAT'S WRONG
        </span>
        <span className="text-[10px] font-mono bg-[#FFE8E2] text-accent font-bold px-1.5 py-0.5 border border-accent/30">
          {severity}
        </span>
      </div>
      
      <div className="border border-frame bg-white p-3.5 mt-2 space-y-3 shadow-[2px_2px_0px_#111111]">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="bg-frame text-white px-1.5 py-0.5 text-[10px] font-bold">01</span>
            <span className="font-bold text-frame tracking-wide cursor-pointer hover:underline" title={`Focus line ${line} in editor`}>
              LINE {line}
            </span>
          </div>
          <span className="text-[11px] text-[#666]">{title}</span>
        </div>
        
        <div className="bg-[#F8F8F6] border-l-2 border-accent p-2 font-mono text-xs text-[#881337] overflow-x-auto">
          <code>{codeSnippet}</code>
        </div>
        
        <div className="text-xs font-mono space-y-1.5 text-[#333333] pt-0.5">
          <div className="flex items-start gap-1.5">
            <span className="text-accent font-bold shrink-0">✕ Diagnosis:</span>
            <span>{diagnosis}</span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-[#15803D] font-bold shrink-0">✓ Expected:</span>
            <span>{expected}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
