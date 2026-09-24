/**
 * Quick check that your Gemini API key and model work, without starting the web app.
 * Run with:  npm run check:api
 */
import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

async function main() {
  console.log(`Testing Gemini API with model "${AI.model}"...\n`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("Roast:", result.roast);
    console.log(`Issues found: ${result.issues.length}`);
    console.log("\n✅ API is working. Run `npm run dev` to start the app.");
  } catch (error) {
    console.error("❌ API check failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
