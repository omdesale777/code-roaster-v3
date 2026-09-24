"use client";

import { useRef, useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import type { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

const MIN_VISIBLE_LINES = 10;
const TAB = "    "; // 4 spaces

// A lightweight code editor: a plain <textarea> with a line-number gutter beside it.
export function CodeEditor({ code, onChange, language, errorLine, onLoadSample }: CodeEditorProps) {
  const gutterRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ line: 1, col: 1 });

  const lineCount = Math.max(code.split("\n").length, MIN_VISIBLE_LINES);
  const languageLabel = LANGUAGES.find((l) => l.id === language)?.label ?? language;

  // Keep the line numbers scrolled in step with the code.
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) gutterRef.current.scrollTop = e.currentTarget.scrollTop;
  };

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const { value, selectionStart } = e.currentTarget;
    const linesBeforeCursor = value.slice(0, selectionStart).split("\n");
    setCursor({
      line: linesBeforeCursor.length,
      col: linesBeforeCursor[linesBeforeCursor.length - 1].length + 1,
    });
  };

  // Pressing Tab inserts 4 spaces instead of moving focus out of the editor.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Tab" || e.shiftKey) return;
    e.preventDefault();
    const textarea = e.currentTarget;
    textarea.setRangeText(TAB, textarea.selectionStart, textarea.selectionEnd, "end");
    onChange(textarea.value);
  };

  return (
    <section className="w-full flex-1 min-h-0 md:flex-none md:w-[54%] lg:w-[55%] flex flex-col border-b-2 md:border-b-0 md:border-r-2 border-frame bg-white overflow-hidden">
      <div className="h-10 border-b border-frame bg-[#FAFAF8] flex items-center justify-between px-4 select-none shrink-0">
        <span className="text-[11px] font-mono text-[#888]">INPUT {"//"} SRC</span>
        <h2 className="font-sans font-bold text-sm tracking-[0.16em] uppercase text-frame">Your Code</h2>
        <div className="flex items-center gap-3 text-[11px] font-mono text-[#666]">
          <button type="button" onClick={onLoadSample} className="hover:text-black hover:underline cursor-pointer">
            SAMPLE BUG
          </button>
          <span>|</span>
          <button type="button" onClick={() => onChange("")} className="hover:text-black hover:underline cursor-pointer">
            CLEAR
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex overflow-hidden font-mono text-xs sm:text-[13px] leading-[22px] relative bg-white">
        {/* Line numbers. pt/pb must match the textarea so the numbers line up with the code. */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="w-12 bg-[#F6F6F3] border-r border-[#E2E2DC] pt-4 pb-12 select-none text-right text-[#999992] shrink-0 overflow-hidden"
        >
          {Array.from({ length: lineCount }, (_, i) => i + 1).map((lineNum) => (
            <span
              key={lineNum}
              className={`block pr-3 ${lineNum === errorLine ? "text-accent font-bold bg-[#FDE8E4]" : ""}`}
            >
              {lineNum}
            </span>
          ))}
        </div>

        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onSelect={handleSelect}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          wrap="off"
          spellCheck={false}
          aria-label="Code input"
          placeholder="// Paste your code here..."
          className="flex-1 min-w-0 h-full px-4 pt-4 pb-10 font-mono text-xs sm:text-[13px] leading-[22px] text-[#1E293B] bg-transparent resize-none focus:outline-none whitespace-pre overflow-auto"
        />

        <div className="absolute bottom-0 inset-x-0 bg-[#F7F7F5] border-t border-[#E5E5DF] px-3 py-1 text-[11px] leading-normal text-[#777] flex items-center justify-between select-none">
          <div>
            Ln {cursor.line}, Col {cursor.col} · {languageLabel}
          </div>
          <div>UTF-8 · Tab Size: 4</div>
        </div>
      </div>
    </section>
  );
}
