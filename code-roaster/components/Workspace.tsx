"use client";

import React, { useState, useEffect } from "react";
import { TopBar } from "./TopBar";
import { RoastControls } from "./RoastControls";
import { CodeEditor } from "./CodeEditor";
import { RoastReport, ReportState } from "./RoastReport";

type RoastLevel = "dry" | "savage" | "sharp";

export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>("savage");
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [reportState, setReportState] = useState<ReportState>("empty");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoast = () => {
    if (!code.trim()) {
      // Mock an error if empty
      setReportState("error");
      setErrorMessage("No code provided. I can't roast the void.");
      return;
    }

    setReportState("loading");
    
    // Simulate API delay
    setTimeout(() => {
      setReportState("results");
    }, 1500);
  };

  const handleApplyFix = (fixedCode: string) => {
    setCode(fixedCode);
    // In a real app, you might clear the report or show a success state.
    // For now, let's keep the results visible so they can see what was fixed.
  };

  // Listen for Cmd+Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [code, roastLevel, language]);

  return (
    <main className="w-full max-w-[1360px] mx-auto my-6 md:my-10 h-[calc(100vh-6rem)] min-h-[760px] max-h-[920px] bg-[#FAFAF8] border-2 border-frame flex flex-col shadow-[6px_6px_0px_rgba(0,0,0,0.06)] relative overflow-hidden">
      <TopBar>
        <RoastControls
          roastLevel={roastLevel}
          setRoastLevel={setRoastLevel}
          language={language}
          setLanguage={setLanguage}
          onRoast={handleRoast}
          isRoasting={reportState === "loading"}
          toggleErrorDrawer={() => setErrorDrawerOpen(!errorDrawerOpen)}
          errorDrawerOpen={errorDrawerOpen}
        />
      </TopBar>

      {errorDrawerOpen && (
        <div className="border-b-2 border-frame bg-[#EFEFEA] px-5 py-2.5 text-xs font-mono">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#555]">
              Attach Terminal Traceback / Compiler Error (Optional)
            </span>
            <button
              onClick={() => setErrorDrawerOpen(false)}
              className="text-xs hover:underline text-[#666]"
            >
              Dismiss ✕
            </button>
          </div>
          <textarea
            className="w-full text-xs font-mono border border-frame p-2 bg-white focus:outline-none focus:ring-0 focus:border-frame resize-none"
            placeholder="TypeError: unsupported operand type(s) for +=: 'int' and 'list'..."
            rows={2}
          ></textarea>
        </div>
      )}

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <CodeEditor
          code={code}
          onChange={setCode}
          language={language}
          errorLine={reportState === "results" ? 5 : undefined}
        />
        <RoastReport
          state={reportState}
          roastLevel={roastLevel}
          onApplyFix={handleApplyFix}
          errorMsg={errorMessage}
          onRetry={handleRoast}
        />
      </div>

      <footer className="border-t-2 border-frame bg-[#F7F7F5] px-4 py-1.5 flex items-center justify-between text-[11px] font-mono text-[#666] select-none shrink-0">
        <div className="flex items-center gap-4">
          <span>
            STATUS: <strong className="text-emerald-700">ONLINE (STATIC ENGINE)</strong>
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">PARSE LATENCY: 22ms</span>
        </div>
        <div>
          <span className="tracking-wide">DRAFTING FRAMEWORK // ARCH SPEC REV-2</span>
        </div>
      </footer>
    </main>
  );
}
