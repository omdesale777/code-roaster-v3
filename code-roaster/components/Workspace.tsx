"use client";

import { useState, useEffect, useCallback } from "react";
import { TopBar } from "./TopBar";
import { RoastControls } from "./RoastControls";
import { ErrorMessageInput } from "./ErrorMessageInput";
import { CodeEditor } from "./CodeEditor";
import { RoastReport } from "./RoastReport";
import { StatusBar } from "./StatusBar";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { requestRoast } from "@/lib/api";
import type { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";

// The main screen. Owns all app state and passes it down to the smaller components.
export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState(false);

  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState("");
  const [apiError, setApiError] = useState("");

  const isRoasting = reportState === "loading";

  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code.trim()) {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setRoastResult(null);
    setApiError("");

    try {
      const result = await requestRoast({
        language,
        code,
        roastLevel,
        errorMessage: errorMessage.trim() || undefined,
      });
      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "An unexpected error occurred.");
      setReportState("error");
    }
  }, [isRoasting, code, language, roastLevel, errorMessage]);

  const handleLoadSample = () => {
    setLanguage(SAMPLE.language);
    setCode(SAMPLE.code);
  };

  // Ctrl+Enter (Windows/Linux) or Cmd+Enter (Mac) runs the roast from anywhere on the page.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRoast]);

  // Highlight the first issue's line, but only while the editor still holds the code that was roasted.
  const errorLine =
    reportState === "results" && code === roastedCode ? roastResult?.issues[0]?.line : undefined;

  return (
    <main className="w-full max-w-[1360px] mx-auto my-6 md:my-10 h-[calc(100vh-6rem)] min-h-[760px] max-h-[920px] bg-[#FAFAF8] border-2 border-frame flex flex-col shadow-[6px_6px_0px_rgba(0,0,0,0.06)] relative overflow-hidden">
      <TopBar>
        <RoastControls
          roastLevel={roastLevel}
          onRoastLevelChange={setRoastLevel}
          language={language}
          onLanguageChange={setLanguage}
          onRoast={handleRoast}
          isRoasting={isRoasting}
          errorDrawerOpen={errorDrawerOpen}
          onToggleErrorDrawer={() => setErrorDrawerOpen((open) => !open)}
        />
      </TopBar>

      {errorDrawerOpen && (
        <ErrorMessageInput
          value={errorMessage}
          onChange={setErrorMessage}
          onClose={() => setErrorDrawerOpen(false)}
        />
      )}

      <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
        <CodeEditor
          code={code}
          onChange={setCode}
          language={language}
          errorLine={errorLine}
          onLoadSample={handleLoadSample}
        />
        <RoastReport
          state={reportState}
          roastLevel={roastLevel}
          language={language}
          result={roastResult}
          errorMsg={apiError}
          onRetry={handleRoast}
          onApplyFix={setCode}
        />
      </div>

      <StatusBar isRoasting={isRoasting} />
    </main>
  );
}
