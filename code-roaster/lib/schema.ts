import { Type, type Schema } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

// Forces Gemini to reply with JSON in exactly this shape (mirrors RoastResult in types/roast.ts).
export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "The main roast summary",
    },
    issues: {
      type: Type.ARRAY,
      description: "List of issues found in the code, most serious first",
      items: {
        type: Type.OBJECT,
        properties: {
          line: { type: Type.INTEGER, description: "1-based line number in the submitted code" },
          severity: { type: Type.STRING, enum: [...SEVERITIES] },
          title: { type: Type.STRING },
          codeSnippet: { type: Type.STRING },
          diagnosis: { type: Type.STRING },
          expected: { type: Type.STRING },
        },
        required: ["line", "severity", "title", "codeSnippet", "diagnosis", "expected"],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "The complete, corrected code",
    },
    takeaway: {
      type: Type.STRING,
      description: "A final takeaway or advice",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
