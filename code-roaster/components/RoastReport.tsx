import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { IssueCard } from "./IssueCard";
import { FixedCode } from "./FixedCode";
import { SectionHeader } from "./SectionHeader";
import type { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg: string;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

// Right-hand panel: shows the empty, loading, error or results view.
export function RoastReport({ state, roastLevel, language, result, errorMsg, onRetry, onApplyFix }: RoastReportProps) {
  return (
    <section className="w-full flex-1 min-h-0 md:flex-none md:w-[46%] lg:w-[45%] flex flex-col bg-[#FAFAF8] overflow-hidden">
      <div className="h-10 border-b border-frame bg-[#F7F7F5] flex items-center justify-between px-4 select-none shrink-0">
        <span className="text-[11px] font-mono text-[#888]">AUDIT {"//"} REPORT</span>
        <h2 className="font-sans font-bold text-sm tracking-[0.16em] uppercase text-frame">Roast Report</h2>
        <div className="w-12" />
      </div>

      {state === "empty" && <EmptyState />}
      {state === "loading" && <LoadingState />}
      {state === "error" && <ErrorState error={errorMsg} onRetry={onRetry} />}

      {state === "results" && result && (
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-7 space-y-7">
          <article className="space-y-2">
            <SectionHeader number={1} title="Roast">
              <span className="text-[10px] font-mono text-[#888] tracking-widest uppercase">STYLE: {roastLevel}</span>
            </SectionHeader>
            <p className="text-sm md:text-[15px] font-mono leading-relaxed text-frame pt-1.5">
              &ldquo;{result.roast}&rdquo;
            </p>
          </article>

          <article className="space-y-4">
            <SectionHeader number={2} title="What's Wrong">
              <span className="text-[10px] font-mono text-[#888] tracking-widest uppercase">
                {result.issues.length} {result.issues.length === 1 ? "ISSUE" : "ISSUES"}
              </span>
            </SectionHeader>
            {result.issues.length === 0 ? (
              <p className="text-xs font-mono text-[#15803D]">No issues found. Suspiciously clean.</p>
            ) : (
              result.issues.map((issue, index) => <IssueCard key={index} index={index} issue={issue} />)
            )}
          </article>

          {result.correctedCode && (
            <FixedCode sectionNumber={3} language={language} code={result.correctedCode} onApply={onApplyFix} />
          )}

          {result.takeaway && (
            <article className="space-y-2">
              <SectionHeader number={result.correctedCode ? 4 : 3} title="Takeaway" />
              <p className="text-sm font-mono leading-relaxed text-[#333] pt-1.5">{result.takeaway}</p>
            </article>
          )}
        </div>
      )}
    </section>
  );
}
