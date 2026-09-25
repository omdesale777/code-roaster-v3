# 🔥 Code Roaster

Paste your code and get a witty roast, a list of issues, and the corrected code. It's powered by Google Gemini.

Built with **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, and the **Google Gen AI SDK**.

---

## 1. Setup

**Requirements:** Node.js 20.9 or newer (check with `node -v`).

```bash
# 1. Install dependencies
npm install

# 2. Create your env file from the template
cp .env.example .env.local        # Windows (cmd): copy .env.example .env.local

# 3. Open .env.local and paste your key from https://aistudio.google.com/apikey

# 4. (Optional) Check that the key works
npm run check:api

# 5. Start the app
npm run dev
```

Then open **http://localhost:3000**.

## 2. Scripts

| Command             | What it does                                      |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Starts the dev server with hot reload             |
| `npm run build`     | Creates a production build                        |
| `npm start`         | Runs the production build                         |
| `npm run lint`      | Checks the code with ESLint                       |
| `npm run check:api` | Tests your Gemini API key without starting the UI |

## 3. Project structure

```
code-roaster/
├── app/
│   ├── api/roast/route.ts   # Backend: POST /api/roast. Validates input, calls Gemini
│   ├── layout.tsx           # Root HTML layout, fonts, page title
│   ├── page.tsx             # Home page, renders <Workspace />
│   └── globals.css          # Tailwind + theme colours
│
├── components/              # UI (React)
│   ├── Workspace.tsx        # Main screen: holds all state, wires everything together
│   ├── TopBar.tsx           # Header with the app name
│   ├── RoastControls.tsx    # Roast level, language, and the Roast button
│   ├── ErrorMessageInput.tsx# Optional drawer to paste an error message
│   ├── CodeEditor.tsx       # Textarea with line numbers
│   ├── RoastReport.tsx      # Right panel: picks the empty/loading/error/results view
│   ├── SectionHeader.tsx    # "01 // ROAST" style headings
│   ├── IssueCard.tsx        # One issue found in the code
│   ├── FixedCode.tsx        # Corrected code with Copy / Apply buttons
│   ├── EmptyState.tsx       # Right panel before the first roast
│   ├── LoadingState.tsx     # Right panel while waiting
│   ├── ErrorState.tsx       # Right panel when something fails
│   └── StatusBar.tsx        # Footer
│
├── config/
│   └── app.config.ts        # ⚙️ All settings: model, languages, roast levels, limits, sample code
│
├── lib/
│   ├── api.ts               # Browser → calls our /api/roast route
│   ├── gemini.ts            # Server → calls Gemini (the API key is used only here)
│   ├── prompt.ts            # System prompt + builds the user prompt
│   └── schema.ts            # JSON shape Gemini must reply with
│
├── types/
│   └── roast.ts             # Shared TypeScript types (request, result, issue)
│
├── scripts/
│   └── check-api.ts         # `npm run check:api`
│
├── .env.example             # Template for environment variables (committed)
└── .env.local               # Your real API key (NOT committed)
```

## 4. How a roast flows

```
CodeEditor ─▶ Workspace.handleRoast()
                 │
                 ▼
            lib/api.ts  ── POST /api/roast ──▶  app/api/roast/route.ts  (validates input)
                                                        │
                                                        ▼
                                                  lib/gemini.ts  ──▶  Google Gemini
                                                  (prompt.ts + schema.ts)
                 ◀──────────────── RoastResult JSON ────┘
                 │
                 ▼
            RoastReport ─▶ IssueCard × N, FixedCode, Takeaway
```

The API key stays on the server. The browser only talks to our own `/api/roast` route.

## 5. Configuration

| What                                  | Where                                          |
| ------------------------------------- | ---------------------------------------------- |
| Secrets (API key)                     | `.env.local` (copy from `.env.example`)        |
| AI model, languages, roast levels,    | `config/app.config.ts`                         |
| size limits, sample code, app name    |                                                |
| The AI's personality, language        | `lib/prompt.ts`                                |
| (Hinglish + emojis) and rules         |                                                |

Examples:

- **Add a language:** add `{ id: "kotlin", label: "Kotlin", extension: "kt" }` to `LANGUAGES`.
- **Change the model:** edit `AI.model` (and `AI.modelLabel` for the footer).
- **Add a roast level:** add an entry to `ROAST_LEVELS`. The UI, the types, and the prompt all update automatically.

## 6. Troubleshooting

| Problem                                   | Fix                                                                     |
| ----------------------------------------- | ----------------------------------------------------------------------- |
| `GEMINI_API_KEY is missing`               | Create `.env.local` from `.env.example`, then **restart** `npm run dev`. |
| `Gemini rejected the request` / `denied`  | The API key is wrong or disabled. Make a new one in AI Studio.          |
| `Gemini is overloaded`                    | Temporary on Google's side. The app retries automatically; try again.   |
| `Rate limit reached`                      | Free keys allow a limited number of requests per minute. Wait a bit.    |
| Copy button says "COPY BLOCKED"           | Clipboard access needs `localhost` or `https`. Select the code manually. |
