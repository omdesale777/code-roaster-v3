import { NextResponse } from "next/server";
import { analyzeCode } from "@/lib/gemini";

const VALID_ROAST_LEVELS = ["dry", "sharp", "savage"];
const VALID_LANGUAGES = ["Python", "JavaScript", "TypeScript", "Java", "C", "C++"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { language, code, errorMessage, roastLevel } = body;

    // Validation
    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Code is required and must be a string." }, { status: 400 });
    }
    if (code.length > 8000) {
      return NextResponse.json({ error: "Code exceeds maximum length of 8000 characters." }, { status: 400 });
    }

    if (errorMessage && (typeof errorMessage !== "string" || errorMessage.length > 2000)) {
      return NextResponse.json({ error: "Error message must be a string up to 2000 characters." }, { status: 400 });
    }

    if (!VALID_ROAST_LEVELS.includes(roastLevel)) {
      return NextResponse.json({ error: "Invalid roastLevel. Must be dry, sharp, or savage." }, { status: 400 });
    }

    // Since validation requires one of the exact languages, we do a case-insensitive check or exact match
    // The prompt says "language must be one of: Python, JavaScript, TypeScript, Java, C, C++"
    if (!VALID_LANGUAGES.includes(language)) {
      return NextResponse.json({ error: "Invalid language. Supported languages: Python, JavaScript, TypeScript, Java, C, C++" }, { status: 400 });
    }

    // Call analyzeCode exactly once
    const result = await analyzeCode(language, code, errorMessage || undefined, roastLevel);

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    const errorString = String(error);
    
    // Check for 429 / Quota / Rate limit
    if (
      errorString.toLowerCase().includes("429") || 
      errorString.toLowerCase().includes("quota") || 
      errorString.toLowerCase().includes("rate limit")
    ) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    // Default to 500 without exposing internal stack traces
    return NextResponse.json({ error: "An internal server error occurred during code analysis." }, { status: 500 });
  }
}
