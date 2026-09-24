import React from "react";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { IssueCard } from "./IssueCard";
import { FixedCode } from "./FixedCode";

export type ReportState = "empty" | "loading" | "results" | "error";

interface RoastReportProps {
  state: ReportState;
  roastLevel: string;
  onApplyFix: (code: string) => void;
  errorMsg?: string;
  onRetry?: () => void;
}

export function RoastReport({ state, roastLevel, onApplyFix, errorMsg, onRetry }: RoastReportProps) {
  return (
    <section className="w-full md:w-[46%] lg:w-[45%] flex flex-col bg-[#FAFAF8] h-full overflow-hidden">
      <div className="h-10 border-b border-frame bg-[#F7F7F5] flex items-center justify-between px-4 select-none shrink-0">
        <span className="text-[11px] font-mono text-[#888]">AUDIT // REPORT</span>
        <h2 className="font-sans font-bold text-sm tracking-[0.16em] uppercase text-frame">
          Roast Report
        </h2>
        <div className="w-12"></div>
      </div>

      {state === "empty" && <EmptyState />}
      {state === "loading" && <LoadingState />}
      {state === "error" && <ErrorState error={errorMsg || ""} onRetry={onRetry || (() => {})} />}

      {state === "results" && (
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-7 space-y-7">
          <article className="space-y-2">
            <div className="flex items-center justify-between border-b border-frame pb-1">
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-frame">
                01 // ROAST
              </span>
              <span className="text-[10px] font-mono text-[#888] tracking-widest uppercase">
                STYLE: {roastLevel}
              </span>
            </div>
            <p className="text-sm md:text-[15px] font-mono leading-relaxed text-frame pt-1.5 font-normal">
              "You initialized <code className="bg-[#ECECE8] px-1 py-0.5 border border-[#D5D5CD] text-xs">total</code> correctly and then immediately added the entire list to it. The loop variable is watching this crime in real time."
            </p>
          </article>

          <IssueCard
            severity="FATAL BUG"
            line={5}
            title="TypeError: unhashable / operand mismatch"
            codeSnippet="total += numbers"
            diagnosis={
              <>
                The loop variable is <code className="bg-[#ECECE8] px-1 py-0.2">number</code>, but the code adds the entire <code className="bg-[#ECECE8] px-1 py-0.2">numbers</code> list to <code className="bg-[#ECECE8] px-1 py-0.2">total</code>.
              </>
            }
            expected={
              <>
                Add the current scalar numeric value to <code className="bg-[#ECECE8] px-1 py-0.2">total</code> on every iteration.
              </>
            }
          />

          <FixedCode
            filename="solution.py"
            rawCode={`def calculate_average(numbers):\n    total = 0\n    for number in numbers:\n        total += number\n    return total / len(numbers)`}
            codeHtml={
              <pre className="font-mono text-xs leading-[20px] m-0">
                <span className="text-[#164E63] font-bold">def</span> <span className="text-[#0F172A] font-bold">calculate_average</span>(<span className="text-[#1E293B]">numbers</span>):
                <br />    <span className="text-[#1E293B]">total</span> = <span className="text-[#854D0E] font-medium">0</span>
                <br />    <span className="text-[#164E63] font-bold">for</span> <span className="text-[#1E293B]">number</span> <span className="text-[#164E63] font-bold">in</span> <span className="text-[#1E293B]">numbers</span>:
                <br />        <span className="text-[#1E293B]">total</span> <span className="text-[#475569]">+=</span> <span className="font-bold text-[#15803D] bg-[#ECFDF5] px-1">number</span>  <span className="text-[#15803D] font-sans font-medium text-[11px]"># Correct variable used</span>
                <br />    <span className="text-[#164E63] font-bold">return</span> <span className="text-[#1E293B]">total</span> <span className="text-[#475569]">/</span> <span className="text-[#3730A3]">len</span>(<span className="text-[#1E293B]">numbers</span>)
              </pre>
            }
            onApply={onApplyFix}
          />
        </div>
      )}
    </section>
  );
}
