import { analyzeCode } from "../lib/gemini";

async function main() {
  const language = "python";
  const roastLevel = "sharp";
  const errorMessage = "NameError: name 'usr' is not defined";
  const code = `def welcome(user):
    print("Welcome", usr)

welcome("Om")`;

  console.log("Testing Gemini API connectivity...");
  try {
    const result = await analyzeCode(language, code, errorMessage, roastLevel);
    console.log("Raw Result:\n", JSON.stringify(result, null, 2));

    console.log("\n--- Validation ---");
    console.log("Contains 'roast':", "roast" in result);
    console.log("Contains 'issues':", "issues" in result);
    console.log("Contains 'correctedCode':", "correctedCode" in result);
    console.log("Contains 'takeaway':", "takeaway" in result);
  } catch (error) {
    console.error("Test failed:", error);
  }
}

main();
