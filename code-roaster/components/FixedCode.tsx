"use client";

import React, { useState } from "react";

interface FixedCodeProps {
  filename?: string;
  codeHtml: React.ReactNode;
  rawCode: string;
  onApply: (code: string) => void;
}

export function FixedCode({ filename = "solution.py", codeHtml, rawCode, onApply }: FixedCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <article className="space-y-2">
      <div className="flex items-center justify-between border-b border-frame pb-1">
        <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-frame">
          03 // FIX
        </span>
        <span className="text-[10px] font-mono text-[#15803D] font-bold uppercase tracking-wider">
          TESTED & VERIFIED
        </span>
      </div>
      
      <div className="border border-frame bg-white mt-2 overflow-hidden shadow-[2px_2px_0px_#111111]">
        <div className="bg-[#F2F2EE] border-b border-frame px-3 py-1 flex items-center justify-between text-[11px] font-mono">
          <span className="text-[#555]">{filename}</span>
          <span className="text-[10px] text-[#15803D] font-bold">No issues detected</span>
        </div>
        <div className="p-3.5 text-xs font-mono leading-[20px] overflow-x-auto text-[#1E293B] m-0">
          {codeHtml}
        </div>
      </div>
      
      <div className="pt-2 flex flex-wrap items-center gap-3">
        <button
          onClick={handleCopy}
          className="border border-frame bg-white px-3 py-1.5 font-mono text-xs font-bold tracking-wider hover:bg-frame hover:text-white transition-all flex items-center gap-2 text-frame"
        >
          <span>{copied ? "✓" : "📋"}</span>
          <span>{copied ? "COPIED TO CLIPBOARD" : "COPY FIXED CODE"}</span>
        </button>
        <button
          onClick={() => onApply(rawCode)}
          className="border border-frame bg-[#F4F4F0] px-3 py-1.5 font-mono text-xs font-medium hover:bg-frame hover:text-white transition-all text-frame"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </article>
  );
}
