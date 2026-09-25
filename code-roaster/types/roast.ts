import { LANGUAGES, ROAST_LEVELS, SEVERITIES } from "@/config/app.config";

// These types are derived from the config, so adding a language or roast level there updates them automatically.
export type LanguageId = (typeof LANGUAGES)[number]["id"];
export type RoastLevel = (typeof ROAST_LEVELS)[number]["id"];
export type Severity = (typeof SEVERITIES)[number];

// What the browser sends to POST /api/roast
export interface RoastRequest {
  language: LanguageId;
  code: string;
  roastLevel: RoastLevel;
  errorMessage?: string;
}

export interface RoastIssue {
  line: number;
  severity: Severity;
  title: string;
  codeSnippet: string;
  diagnosis: string;
  expected: string;
}

// What POST /api/roast returns on success
export interface RoastResult {
  roast: string;
  issues: RoastIssue[];
  correctedCode: string;
  takeaway: string;
}

// The right-hand panel shows exactly one of these at a time
export type ReportState = "empty" | "loading" | "results" | "error";
