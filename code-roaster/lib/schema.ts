import { Type, Schema } from "@google/genai";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "The main roast summary",
    },
    issues: {
      type: Type.ARRAY,
      description: "List of issues found in the code",
      items: {
        type: Type.OBJECT,
        properties: {
          line: { type: Type.INTEGER },
          severity: { type: Type.STRING, description: "FATAL BUG, CODE SMELL, or OPTIMIZATION" },
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
