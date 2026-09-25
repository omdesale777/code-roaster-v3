import { NextResponse } from "next/server";
import { analyzeCode } from "@/lib/gemini";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import type { LanguageId, RoastLevel } from "@/types/roast";

// POST /api/roast  →  validates the request, asks Gemini, returns a RoastResult as JSON.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const code = typeof body.code === "string" ? body.code : "";
  const errorMessage = typeof body.errorMessage === "string" ? body.errorMessage.trim() : "";

  if (!code.trim()) {
    return NextResponse.json({ error: "No code provided." }, { status: 400 });
  }
  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      { error: `Code is too long. Keep it under ${LIMITS.maxCodeLength.toLocaleString()} characters.` },
      { status: 400 }
    );
  }
  if (errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      { error: `Error message is too long. Keep it under ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.` },
      { status: 400 }
    );
  }

  // Unknown values fall back to the defaults instead of reaching the AI.
  const language = LANGUAGES.some((l) => l.id === body.language)
    ? (body.language as LanguageId)
    : DEFAULTS.language;
  const roastLevel = ROAST_LEVELS.some((l) => l.id === body.roastLevel)
    ? (body.roastLevel as RoastLevel)
    : DEFAULTS.roastLevel;

  try {
    const result = await analyzeCode({
      language,
      code,
      roastLevel,
      errorMessage: errorMessage || undefined,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Roast API error:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
