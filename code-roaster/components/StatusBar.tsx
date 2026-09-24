import { AI, APP } from "@/config/app.config";

export function StatusBar({ isRoasting }: { isRoasting: boolean }) {
  return (
    <footer className="border-t-2 border-frame bg-[#F7F7F5] px-4 py-1.5 flex items-center justify-between text-[11px] font-mono text-[#666] select-none shrink-0">
      <div className="flex items-center gap-4">
        <span>
          STATUS:{" "}
          <strong className={isRoasting ? "text-amber-600" : "text-emerald-700"}>
            {isRoasting ? "PROCESSING..." : `ONLINE (${AI.modelLabel.toUpperCase()})`}
          </strong>
        </span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline">ENGINE: GOOGLE GEMINI</span>
      </div>
      <span className="tracking-wide uppercase">
        {APP.name} {APP.version} {"// LIVE"}
      </span>
    </footer>
  );
}
