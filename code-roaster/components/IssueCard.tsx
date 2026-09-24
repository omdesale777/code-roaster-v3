import type { RoastIssue, Severity } from "@/types/roast";

const SEVERITY_STYLES: Record<Severity, string> = {
  "FATAL BUG": "bg-[#FFE8E2] text-accent border-accent/30",
  "CODE SMELL": "bg-[#FFF7E6] text-[#854D0E] border-[#854D0E]/30",
  OPTIMIZATION: "bg-[#E8F5E9] text-[#15803D] border-[#15803D]/30",
};

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

export function IssueCard({ index, issue }: IssueCardProps) {
  const severityStyle = SEVERITY_STYLES[issue.severity] ?? SEVERITY_STYLES["CODE SMELL"];

  return (
    <div className="border border-frame bg-white p-3.5 space-y-3 shadow-[2px_2px_0px_#111111]">
      <div className="flex items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-frame text-white px-1.5 py-0.5 text-[10px] font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-bold text-frame tracking-wide">LINE {issue.line}</span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 border ${severityStyle}`}>{issue.severity}</span>
        </div>
        <span className="text-[11px] text-[#666] text-right">{issue.title}</span>
      </div>

      <pre className="bg-[#F8F8F6] border-l-2 border-accent p-2 font-mono text-xs text-[#881337] overflow-x-auto m-0">
        <code>{issue.codeSnippet}</code>
      </pre>

      <div className="text-xs font-mono space-y-1.5 text-[#333333] pt-0.5">
        <div className="flex items-start gap-1.5">
          <span className="text-accent font-bold shrink-0">✕ Diagnosis:</span>
          <span>{issue.diagnosis}</span>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="text-[#15803D] font-bold shrink-0">✓ Expected:</span>
          <span>{issue.expected}</span>
        </div>
      </div>
    </div>
  );
}
