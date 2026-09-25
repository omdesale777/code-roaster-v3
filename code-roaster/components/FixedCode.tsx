"use client";

import { useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { SectionHeader } from "./SectionHeader";
import type { LanguageId } from "@/types/roast";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (code: string) => void;
}

type CopyStatus = "idle" | "copied" | "failed";

export function FixedCode({ sectionNumber, language, code, onApply }: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  const extension = LANGUAGES.find((l) => l.id === language)?.extension ?? "txt";

  const handleCopy = async () => {
    try {
      // navigator.clipboard only exists on https:// or localhost pages.
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
    setTimeout(() => setCopyStatus("idle"), 2000);
  };

  const copyLabel = {
    idle: "📋 COPY FIXED CODE",
    copied: "✓ COPIED TO CLIPBOARD",
    failed: "✕ COPY BLOCKED, SELECT MANUALLY",
  }[copyStatus];

  return (
    <article className="space-y-2">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="text-[10px] font-mono text-[#15803D] font-bold uppercase tracking-wider">CORRECTED CODE</span>
      </SectionHeader>

      <div className="border border-frame bg-white mt-2 overflow-hidden shadow-[2px_2px_0px_#111111]">
        <div className="bg-[#F2F2EE] border-b border-frame px-3 py-1 flex items-center justify-between text-[11px] font-mono">
          <span className="text-[#555]">solution.{extension}</span>
          <span className="text-[10px] text-[#15803D] font-bold">READY TO APPLY</span>
        </div>
        <pre className="p-3.5 overflow-x-auto bg-[#FAFAF8] font-mono text-xs leading-[20px] m-0 text-[#1E293B]">
          <code>{code}</code>
        </pre>
      </div>

      <div className="pt-2 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="border border-frame bg-white px-3 py-1.5 font-mono text-xs font-bold tracking-wider hover:bg-frame hover:text-white transition-all text-frame"
        >
          {copyLabel}
        </button>
        <button
          type="button"
          onClick={() => onApply(code)}
          className="border border-frame bg-[#F4F4F0] px-3 py-1.5 font-mono text-xs font-medium hover:bg-frame hover:text-white transition-all text-frame"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </article>
  );
}
