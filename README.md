# Tribe AI Chatbot

An AI-powered developer companion that combines the [Tribe WebContainer Runtime](https://docs.tribe.sh/) with the [Google Generative AI SDK](https://ai-sdk.dev) to deliver a full-featured, in-browser coding workspace. Users can chat with the assistant to scaffold projects, run commands, edit files, and preview live applications – all without leaving the browser.

> **Note**: The assistant requires a valid `GOOGLE_GENERATIVE_AI_API_KEY` to access Gemini 2.5 Flash. Without an API key the API server will respond with a `503` status code.

## Features

- **WebContainer orchestration** – Boot, manage, and teardown a WebContainer workspace directly from the chat UI.
- **AI-guided workflows** – Uses Google Gemini 2.5 Flash via the `@ai-sdk/google` provider and structured outputs to generate actionable instructions.
- **File system management** – Create, edit, and delete files/folders using natural language commands or the built-in editor.
- **Command execution** – Run arbitrary shell commands (`npm install`, `npm run dev`, etc.) with realtime terminal output.
- **Live preview** – Automatically capture dev-server previews and stream them inside the app.
- **Error handling & logging** – Surface validation issues, process crashes, and AI errors with detailed context.
- **Multi-language support** – The sandbox can host Node.js, React, Express, Vite, or any framework supported by npm packages.

## Project structure

```
.
├── index.html              # Vite entry point
├── package.json            # Workspace dependencies & scripts
├── public/                 # Static assets
├── src/
│   ├── App.tsx             # Main UI and orchestration logic
│   ├── components/         # Presentation components (chat, editor, terminal, preview)
│   ├── hooks/              # WebContainer lifecycle management
│   ├── lib/                # Client helpers and shared types
│   └── styles.css          # Minimal styling
└── server/
    ├── index.ts            # Express API that talks to Gemini
    └── types.ts            # Zod schemas shared by the API
```

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file at the project root and populate it with a valid Google Generative AI API key:

```bash
cp .env.example .env
```

Edit `.env`:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

### 3. Start the development servers

The frontend (Vite) and backend (Express) run concurrently. The Vite dev server proxies `/api` requests to the Express API.

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:8787`

### 4. Build for production

```bash
npm run build
```

This creates the bundled client in `dist/` and compiles the Express server to `dist/server/index.js`.

### 5. Preview production build locally

```bash
npm run preview
```

## How it works

1. **Conversation flow** – User prompts are sent to the Express API along with a summary of project files and dependencies.
2. **Structured AI output** – The API uses `generateObject` with a strict Zod schema so Gemini replies with executable actions (`createOrUpdateFile`, `deletePath`, `runCommand`).
3. **Action execution** – The frontend streams these actions to the WebContainer runtime, updating the filesystem, running commands, and refreshing the workspace automatically.
4. **Observability** – Each action’s status is surfaced in the chat transcript and the action log; terminal output and server previews are captured in dedicated panels.

## Safety considerations

- Commands are executed within the isolated WebContainer sandbox – no server-side execution occurs.
- Structured outputs reduce the risk of prompt-injection by forcing the model to respond with whitelisted actions.
- API requests validate payloads with Zod before invoking Gemini and sanitize file previews in prompts.
- Environment variables are never exposed to the browser; the Express API is the only component that holds the Gemini key.

## Extending the chatbot

- Add new action types (e.g., `appendToFile`, `renamePath`) by updating the shared Zod schema and the WebContainer hook.
- Integrate authentication or per-user sandboxes by wrapping the Express handlers.
- Enhance the editor by swapping the textarea for Monaco or CodeMirror.
- Stream AI responses token-by-token by switching to `streamObject` in the API.

## Troubleshooting

| Issue | Resolution |
| ----- | ---------- |
| `503` from `/api/chat` | Ensure `GOOGLE_GENERATIVE_AI_API_KEY` is configured before starting the server. |
| Commands hang or preview missing | Check the terminal panel for output and confirm the command includes `-- --host` when using dev servers like Vite. |
| Missing dependencies | Ask the assistant to run `npm install <package>` or execute the command manually via chat. |

## License

MIT © Tribe Contributors
