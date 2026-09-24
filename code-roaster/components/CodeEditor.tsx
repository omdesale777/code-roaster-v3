"use client";

import React, { useRef, useEffect, useState } from "react";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language?: string;
  errorLine?: number;
  errorMessage?: string;
}

export function CodeEditor({
  code,
  onChange,
  language = "python",
  errorLine,
  errorMessage,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineCount, setLineCount] = useState(1);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  useEffect(() => {
    setLineCount(code.split("\n").length || 1);
  }, [code]);

  const handleScroll = () => {
    // If we want to sync scrolling of lines, we could do it here
    // but with a simple flex layout, the gutter might need to scroll with the textarea
  };

  const handleSelect = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textBeforeCursor = e.target.value.substring(0, e.target.selectionStart);
    const linesBeforeCursor = textBeforeCursor.split("\n");
    setCursorPos({
      line: linesBeforeCursor.length,
      col: linesBeforeCursor[linesBeforeCursor.length - 1].length + 1,
    });
  };

  return (
    <section className="w-full md:w-[54%] lg:w-[55%] flex flex-col border-b-2 md:border-b-0 md:border-r-2 border-frame bg-white h-full overflow-hidden">
      <div className="h-10 border-b border-frame bg-[#FAFAF8] flex items-center justify-between px-4 select-none shrink-0">
        <span className="text-[11px] font-mono text-[#888]">INPUT // SRC</span>
        <h2 className="font-sans font-bold text-sm tracking-[0.16em] uppercase text-frame">
          Your Code
        </h2>
        <div className="flex items-center gap-3 text-[11px] font-mono text-[#666]">
          <button
            onClick={() =>
              onChange(`def calculate_average(numbers):\n    total = 0\n    for number in numbers:\n        total += numbers\n    return total / len(numbers)\n\nscores = [72, 84, 91, 68]\nprint(calculate_average(scores))`)
            }
            className="hover:text-black hover:underline cursor-pointer"
          >
            SAMPLE BUG
          </button>
          <span>|</span>
          <button
            onClick={() => onChange("")}
            className="hover:text-black hover:underline cursor-pointer"
          >
            CLEAR
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden font-mono text-[13px] leading-[22px] relative bg-white">
        <div className="w-12 bg-[#F6F6F3] border-r border-[#E2E2DC] py-4 select-none text-right pr-3 text-[#999992] shrink-0 font-mono text-xs flex flex-col overflow-y-hidden">
          {Array.from({ length: Math.max(lineCount, 10) }).map((_, i) => {
            const lineNum = i + 1;
            const isError = lineNum === errorLine;
            return (
              <span
                key={lineNum}
                className={
                  isError
                    ? "text-accent font-bold bg-[#FDE8E4] -mr-3 pr-3 block"
                    : "block"
                }
              >
                {lineNum}
              </span>
            );
          })}
        </div>

        <div className="flex-1 relative overflow-auto">
          {/* If there is an error, we show a mock presentation layer behind/over the textarea.
              For a lightweight editor, we'll just use a textarea. We can add a simple highlight layer later. */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => {
              onChange(e.target.value);
              handleSelect(e);
            }}
            onSelect={handleSelect as any}
            onScroll={handleScroll}
            className="absolute inset-0 w-full h-full p-4 font-mono text-xs sm:text-[13px] leading-[22px] whitespace-pre text-[#1E293B] bg-transparent resize-none focus:outline-none"
            spellCheck={false}
            placeholder="# Paste your code here..."
          />
        </div>

        <div className="absolute bottom-0 inset-x-0 bg-[#F7F7F5] border-t border-[#E5E5DF] px-3 py-1 text-[11px] font-mono text-[#777] flex items-center justify-between select-none">
          <div>
            Ln {cursorPos.line}, Col {cursorPos.col} · {language === 'python' ? 'Python 3.11' : language}
          </div>
          <div>UTF-8 · Tab Size: 4</div>
        </div>
      </div>
    </section>
  );
}
