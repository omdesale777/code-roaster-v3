import React from "react";

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#FAFAF8]">
      <div className="w-16 h-16 border-2 border-dashed border-[#AAA] flex items-center justify-center font-mono text-2xl text-[#888] mb-4">
        {"{}"}
      </div>
      <h3 className="font-sans font-bold text-base tracking-wider uppercase mb-1 text-frame">
        Awaiting Code Submission
      </h3>
      <p className="font-mono text-xs text-[#666] max-w-xs leading-relaxed">
        Paste snippet on the left panel and click 'ROAST MY CODE' or press ⌘+Enter to receive an architectural diagnostic.
      </p>
    </div>
  );
}
