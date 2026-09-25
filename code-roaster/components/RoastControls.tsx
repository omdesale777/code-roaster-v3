import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import type { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (language: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-[#666666] font-medium tracking-tight">Roast Level:</span>
        <div className="inline-flex items-center gap-2.5 text-[#111111]">
          {ROAST_LEVELS.map((level) => (
            <label
              key={level.id}
              title={level.description}
              className="cursor-pointer inline-flex items-center gap-1 hover:text-black"
            >
              <input
                type="radio"
                name="roastLevel"
                value={level.id}
                checked={roastLevel === level.id}
                onChange={() => onRoastLevelChange(level.id)}
                className="sr-only peer"
              />
              <span className="w-2.5 h-2.5 rounded-full border border-frame inline-block peer-checked:bg-frame peer-focus-visible:ring-2 peer-focus-visible:ring-accent" />
              <span className="peer-checked:font-bold">{level.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="language" className="text-[#666666] font-medium tracking-tight">
          Language:
        </label>
        <div className="relative">
          <select
            id="language"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none bg-white border border-frame text-xs font-mono py-1 pl-2.5 pr-6 cursor-pointer focus:outline-none focus:ring-0 focus:border-frame"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center text-frame">▾</div>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleErrorDrawer}
        className={`border border-dashed border-frame px-2.5 py-1 text-[11px] font-mono tracking-wide transition-colors ${
          errorDrawerOpen ? "bg-frame text-white" : "bg-white hover:bg-frame hover:text-white"
        }`}
      >
        {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
      </button>

      <button
        type="button"
        onClick={onRoast}
        disabled={isRoasting}
        className="bg-frame text-white px-3.5 py-1.5 font-mono text-xs font-bold tracking-wider hover:bg-neutral-800 active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {isRoasting ? (
          <span className="animate-pulse">ANALYZING...</span>
        ) : (
          <>
            <span>ROAST MY CODE</span>
            <span className="text-[10px] bg-neutral-800 text-neutral-300 border border-neutral-600 px-1 py-0.5 leading-none">
              Ctrl ⏎
            </span>
          </>
        )}
      </button>
    </>
  );
}
