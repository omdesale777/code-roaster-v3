import { ApiError, GoogleGenAI } from "@google/genai";
import { AI } from "@/config/app.config";
import { buildUserPrompt, ROAST_SYSTEM_INSTRUCTION } from "./prompt";
import { roastResponseSchema } from "./schema";
import type { RoastRequest, RoastResult } from "@/types/roast";

// Sends the code to Gemini and returns the parsed roast. Runs on the server only.
export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server.");
  }

  const ai = new GoogleGenAI({ apiKey });

  let text: string | undefined;
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents: buildUserPrompt(request),
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });
      text = response.text;
      break;
    } catch (error) {
      const status = error instanceof ApiError ? error.status : undefined;
      // 503 = model overloaded (common when a whole class hits it at once), so wait and retry.
      if (status === 503 && attempt < AI.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }
      throw new Error(friendlyErrorMessage(status, error));
    }
  }

  if (!text) {
    throw new Error("Gemini returned an empty response. Please try again.");
  }

  let result: RoastResult;
  try {
    result = JSON.parse(text);
  } catch {
    throw new Error("Gemini returned invalid JSON. Please try again.");
  }

  // Guard against missing fields so the UI never crashes on a partial answer.
  return {
    roast: result.roast ?? "",
    issues: Array.isArray(result.issues) ? result.issues : [],
    correctedCode: result.correctedCode ?? "",
    takeaway: result.takeaway ?? "",
  };
}

// Turns raw API errors into messages a student can act on.
function friendlyErrorMessage(status: number | undefined, error: unknown): string {
  const detail = error instanceof Error ? error.message : String(error);
  switch (status) {
    case 400:
      return `Gemini rejected the request (is GEMINI_API_KEY in .env.local valid?). Details: ${detail}`;
    case 403:
      return "Gemini denied access. Check that GEMINI_API_KEY in .env.local is valid.";
    case 404:
      return `Model "${AI.model}" was not found. Update AI.model in config/app.config.ts.`;
    case 429:
      return "Rate limit reached for this API key. Wait a minute and try again.";
    case 503:
      return "Gemini is overloaded right now. Please try again in a few seconds.";
    default:
      return `Gemini request failed: ${detail}`;
  }
}
