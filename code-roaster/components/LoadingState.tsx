export function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#FAFAF8]">
      <div className="w-16 h-16 border-2 border-frame flex items-center justify-center font-mono text-2xl text-frame mb-4 animate-spin">
        /
      </div>
      <h3 className="font-sans font-bold text-base tracking-wider uppercase mb-1 text-frame animate-pulse">
        Analyzing Code
      </h3>
      <p className="font-mono text-xs text-[#666] max-w-xs leading-relaxed">
        Evaluating computational complexity and architectural purity...
      </p>
    </div>
  );
}
