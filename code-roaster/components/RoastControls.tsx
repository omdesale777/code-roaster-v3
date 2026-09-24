import React from "react";

type RoastLevel = "dry" | "savage" | "sharp";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  setRoastLevel: (level: RoastLevel) => void;
  language: string;
  setLanguage: (lang: string) => void;
  onRoast: () => void;
  isRoasting: boolean;
  toggleErrorDrawer?: () => void;
  errorDrawerOpen?: boolean;
}

export function RoastControls({
  roastLevel,
  setRoastLevel,
  language,
  setLanguage,
  onRoast,
  isRoasting,
  toggleErrorDrawer,
  errorDrawerOpen,
}: RoastControlsProps) {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-[#666666] font-medium tracking-tight">Roast Level :</span>
        <div className="inline-flex items-center gap-2.5 text-[#111111]">
          {(["dry", "savage", "sharp"] as RoastLevel[]).map((level) => (
            <label
              key={level}
              className="cursor-pointer inline-flex items-center gap-1 hover:text-black"
            >
              <input
                type="radio"
                name="roastLevel"
                value={level}
                checked={roastLevel === level}
                onChange={() => setRoastLevel(level)}
                className="hidden peer"
              />
              <span className="w-2.5 h-2.5 rounded-full border border-frame inline-block peer-checked:bg-frame"></span>
              <span className="peer-checked:font-bold capitalize">{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[#666666] font-medium tracking-tight">Language:</span>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="appearance-none bg-white border border-frame text-xs font-mono py-1 pl-2.5 pr-6 cursor-pointer focus:outline-none focus:ring-0 focus:border-frame"
          >
            <option value="python">Python</option>
            <option value="typescript">TypeScript</option>
            <option value="rust">Rust</option>
            <option value="go">Go</option>
            <option value="cpp">C++</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center text-frame">
            ▾
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleErrorDrawer}
        className={`border border-dashed border-frame px-2.5 py-1 text-[11px] font-mono tracking-wide transition-colors ${
          errorDrawerOpen ? "bg-frame text-white" : "bg-white hover:bg-frame hover:text-white"
        }`}
      >
        + ERROR MESSAGE
      </button>

      <button
        onClick={onRoast}
        disabled={isRoasting}
        className="bg-frame text-white px-3.5 py-1.5 font-mono text-xs font-bold tracking-wider hover:bg-neutral-800 active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-70 disabled:active:scale-100"
      >
        {isRoasting ? (
          <span className="animate-pulse">ANALYZING...</span>
        ) : (
          <>
            <span>ROAST MY CODE</span>
            <span className="text-[10px] bg-neutral-800 text-neutral-300 border border-neutral-600 px-1 py-0.5 rounded-none leading-none">
              ⌘⏎
            </span>
          </>
        )}
      </button>
    </>
  );
}
