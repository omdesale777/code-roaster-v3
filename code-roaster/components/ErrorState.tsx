import React from "react";

export function ErrorState({ error, onRetry }: { error: string, onRetry: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#FAFAF8]">
      <div className="w-16 h-16 border-2 border-accent flex items-center justify-center font-mono text-2xl text-accent mb-4">
        !
      </div>
      <h3 className="font-sans font-bold text-base tracking-wider uppercase mb-1 text-accent">
        Analysis Failed
      </h3>
      <p className="font-mono text-xs text-[#666] max-w-xs leading-relaxed mb-4">
        {error || "An unknown error occurred during code evaluation."}
      </p>
      <button
        onClick={onRetry}
        className="border border-frame bg-white px-3 py-1.5 font-mono text-xs font-bold tracking-wider hover:bg-frame hover:text-white transition-all text-frame"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
