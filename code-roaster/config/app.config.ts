/**
 * App configuration — the single place to tweak how Code Roaster behaves.
 *
 * This file is imported by BOTH the browser and the server,
 * so never put secrets here. Secrets (like the API key) live in `.env.local`.
 */

export const APP = {
  name: "Code Roaster",
  version: "v3",
  tagline: "Your code. Our problem now.",
};

export const AI = {
  // Gemini model used for the roast. Browse models: https://ai.google.dev/gemini-api/docs/models
  model: "gemini-3.5-flash-lite",
  // Human-friendly name shown in the footer.
  modelLabel: "Gemini 3.5 Flash-Lite",
  // Retries when Gemini is temporarily overloaded (HTTP 503).
  maxAttempts: 3,
};

// Ordered from mildest to harshest.
export const ROAST_LEVELS = [
  { id: "dry", label: "Dry", description: "Mild and deadpan. Gentle jabs, mostly helpful." },
  { id: "sharp", label: "Sharp", description: "Pointed and witty. Calls out every mistake directly." },
  { id: "savage", label: "Savage", description: "Maximum burn. Brutally honest, but still technically accurate." },
] as const;

export const LANGUAGES = [
  { id: "python", label: "Python", extension: "py" },
  { id: "javascript", label: "JavaScript", extension: "js" },
  { id: "typescript", label: "TypeScript", extension: "ts" },
  { id: "java", label: "Java", extension: "java" },
  { id: "c", label: "C", extension: "c" },
  { id: "cpp", label: "C++", extension: "cpp" },
  { id: "go", label: "Go", extension: "go" },
  { id: "rust", label: "Rust", extension: "rs" },
] as const;

export const DEFAULTS = {
  language: "python",
  roastLevel: "savage",
} as const;

// Severity labels the AI must use for each issue (also drives the badge colours).
export const SEVERITIES = ["FATAL BUG", "CODE SMELL", "OPTIMIZATION"] as const;

// Protects your API quota from huge pastes.
export const LIMITS = {
  maxCodeLength: 20_000,
  maxErrorMessageLength: 4_000,
};

// Loaded by the "SAMPLE BUG" button in the editor.
export const SAMPLE = {
  language: "python",
  code: `def calculate_average(numbers):
    total = 0
    for number in numbers:
        total += numbers
    return total / len(numbers)

scores = [72, 84, 91, 68]
print(calculate_average(scores))`,
} as const;
