import { GoogleGenAI } from "@google/genai";
import { ROAST_SYSTEM_INSTRUCTION } from "./prompt";
import { roastResponseSchema } from "./schema";

export async function analyzeCode(
  language: string,
  code: string,
  errorMessage: string | undefined,
  roastLevel: string
) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured on the server.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const userPrompt = `
Language: ${language}
Roast Level: ${roastLevel}
${errorMessage ? `Error Message: ${errorMessage}\n` : ""}
Code:
\`\`\`${language}
${code}
\`\`\`
  `.trim();

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: userPrompt,
      config: {
        systemInstruction: ROAST_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: roastResponseSchema,
      },
    });

    if (!response.text) {
      throw new Error("Gemini returned an empty response.");
    }

    try {
      const parsedData = JSON.parse(response.text);
      return parsedData;
    } catch (parseError) {
      throw new Error("Failed to parse Gemini JSON output: " + String(parseError));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes("empty response") || error.message.includes("Failed to parse")) {
        throw error;
      }
      throw new Error(`Gemini request failed: ${error.message}`);
    }
    throw new Error(`Gemini request failed: ${String(error)}`);
  }
}
