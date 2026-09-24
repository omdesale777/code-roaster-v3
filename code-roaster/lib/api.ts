import type { RoastRequest, RoastResult } from "@/types/roast";

// Browser-side helper that calls our own API route (the API key never reaches the browser).
export async function requestRoast(payload: RoastRequest): Promise<RoastResult> {
  let response: Response;
  try {
    response = await fetch("/api/roast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Could not reach the server. Is `npm run dev` still running?");
  }

  // The server may send a non-JSON page if it crashes, so parse defensively.
  const data = await response.json().catch(() => null);

  if (!response.ok || !data) {
    throw new Error(data?.error || `Server error (${response.status}). Please try again.`);
  }

  return data as RoastResult;
}
