# Gemini + AI SDK Agents + Browser Runtime Reference

> **Audience:** Engineers building, operating, or extending the Gemini-powered, browser-native AI development environment.
>
> **Goal:** Provide a single-page, implementation-ready handbook that captures architecture, operational practices, tool contracts, and design rationale for the Gemini + AI SDK + WebContainers stack.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Architecture](#2-architecture)
3. [Agent Modes](#3-agent-modes)
4. [Execution Model](#4-execution-model)
5. [API Contract](#5-api-contract)
6. [Tool Catalog](#6-tool-catalog)
7. [Client Runtime Integration](#7-client-runtime-integration)
8. [Workspace Memory & Persistence](#8-workspace-memory--persistence)
9. [Security & Privacy](#9-security--privacy)
10. [Error Handling & Resilience](#10-error-handling--resilience)
11. [Testing & Verification](#11-testing--verification)
12. [Extending the Platform](#12-extending-the-platform)
13. [Appendix: Reference Snippets](#appendix-reference-snippets)

---

## 1. Overview

### Purpose

The Gemini agent runtime is a Next.js-based control surface backed by the Vercel AI SDK. It orchestrates Google Gemini models that plan and emit tool calls to a browser-resident execution environment powered by WebContainers. All code execution happens inside the user's tab, giving low latency, strong privacy, and deterministic control.

### Goals (v2)

- Multiple agent modes (fast / balanced / deep) that expose model, temperature, and thinking budget controls.
- Multi-step planning via `plan.create` to separate reasoning and execution.
- Persistent workspace memory (files, last command, server state, installed packages).
- Integrated artifact list bridged to editor and terminal panes.
- Extensible tool set (filesystem, shell, npm, tests) with structured error feedback.

### Non-Goals

- Running arbitrary user code on the server.
- Long-term cloud persistence (provide export/import instead).
- Complex multi-agent orchestration (deferred).

---

## 2. Architecture

```
+---------------------+                       +-------------------------------+
|  Next.js API        |     SSE / fetch       |       Browser (Client)        |
|  /api/ai            | <-------------------> |  WebContainers + UI           |
|                     |                       |                               |
|  - AI SDK Agents    |                       |  - Code editor (CodeMirror)   |
|  - Google Gemini    |                       |  - Terminal (xterm.js)        |
|  - Tool schemas     |  tool calls emitted   |  - Tool executor (FS, shell)  |
|  - Planning model   | --------------------> |  - BroadcastChannel bridge    |
+---------------------+   tool results back   +-------------------------------+
```

### Component Breakdown

| Layer | Technology | Responsibilities |
| --- | --- | --- |
| **Agent Brain** | AI SDK + Google Gemini | Reasoning, planning, tool selection, streaming responses |
| **API Layer** | Next.js Route Handler | Applies mode config, prepends system prompt, streams SSE events |
| **Tool Schemas** | Zod + AI SDK | Declare JSON contracts for filesystem, shell, npm, tests, planner |
| **Client UI** | React + AI SDK hooks | Presents chat, editor, terminal, artifacts, preview |
| **Tool Executor** | BroadcastChannel worker | Routes tool calls to WebContainers, returns structured results |
| **Runtime** | WebContainers API | In-tab Node.js + shell, virtual FS, process management |
| **Persistence** | IndexedDB (OPFS) | Stores workspace files, state, conversation history |

### Request Flow

1. User submits a prompt with selected mode and workspace state.
2. Server builds a system prompt summarizing state, selects model + configuration, and begins streaming.
3. Assistant messages interleave with structured tool-call events (`tool-call`, `tool-call-delta`).
4. Client forwards tool calls via `BroadcastChannel` to the executor.
5. WebContainers run filesystem/shell/npm/test operations and return results as `tool` role messages.
6. Server consumes results, continues reasoning, or finalizes response with `finish` event.

---

## 3. Agent Modes

| Mode | Model | Thinking Budget | Temperature | Max Steps | Primary Use Case |
| --- | --- | --- | --- | --- | --- |
| **fast** | `gemini-2.0-flash` | 0 | 0.7 | 3 | Quick scaffolds, simple edits |
| **balanced** | `gemini-2.0-flash-thinking-exp` | 2048 | 0.5 | 5 | General development with reasoning |
| **deep** | `gemini-2.5-pro-exp` | 8192 | 0.3 | 10 | Complex planning, architecture, debugging |

> **Thinking budget** controls model-side chain-of-thought allocation. Higher budgets improve plan quality at the cost of latency. Only deep mode exposes `includeThoughts` metadata for telemetry.

### Mode Selection Heuristics

```ts
const pickMode = (input: string): 'fast' | 'balanced' | 'deep' => {
  if (isSingleFileEdit(input) || isSmallRefactor(input)) return 'fast';
  if (requiresPlanning(input) || crossesSubsystems(input)) return 'deep';
  return 'balanced';
};
```

---

## 4. Execution Model

### Server Responsibilities

- Validate tool calls against Zod schemas before streaming.
- Inject workspace summary (file names, last command, server state) into system prompt.
- Limit `maxSteps` to prevent runaway tool loops.
- Emit headers such as `X-Agent-Mode` and thinking metadata for observability.

### Client Responsibilities

- Bootstrap WebContainers once per tab; mount workspace files.
- Listen for tool calls and dispatch to executor worker.
- Pipe process output to xterm.js; sync editor state with file writes.
- Forward `tool` role results back to AI SDK `useChat` stream.
- Manage IndexedDB persistence and restore workspace state on reload.

---

## 5. API Contract

### POST `/api/ai` — Chat + Tools

**Request Body**

```json
{
  "messages": [
    { "role": "system" | "user" | "assistant" | "tool", "content": "..." }
  ],
  "mode": "fast" | "balanced" | "deep",
  "workspaceState": {
    "files": { "path/to/file": "content" },
    "lastCommand": "npm run dev",
    "serverRunning": false,
    "installedPackages": ["express"],
    "openPorts": [3000]
  }
}
```

**Response Stream Events**

```
data: {"type":"text-delta","textDelta":"Let’s install Express.\n"}

data: {"type":"tool-call","toolCallId":"call_1","toolName":"install.npm","args":{"packages":["express"]}}

data: {"type":"tool-call-delta","toolCallId":"call_2","argsTextDelta":"{\"path\":\"server.js\","}

data: {"type":"finish","finishReason":"stop","usage":{"promptTokens":245,"completionTokens":156}}

data: [DONE]
```

### PUT `/api/ai` — Planner

**Request Body**

```json
{
  "goal": "Create an Express server with /ping",
  "context": {
    "files": ["server.js", "package.json"],
    "packages": ["express"],
    "previousAttempts": []
  }
}
```

**Response Body**

```json
{
  "goal": "Create an Express server with /ping",
  "estimatedSteps": 3,
  "steps": [
    {
      "id": 1,
      "description": "Initialize project files",
      "tools": ["fs.writeFile"],
      "dependencies": [],
      "validation": "Files exist with expected content",
      "estimatedDuration": "short"
    }
  ],
  "risks": ["Port conflicts", "Missing COOP/COEP headers"],
  "fallbackStrategies": ["Use different port", "Ensure headers in dev server"]
}
```

---

## 6. Tool Catalog

All tools adhere to the AI SDK schema pattern: `{ name, description, parameters: z.object({...}) }`.

| Tool | Parameters | Description | Notes |
| --- | --- | --- | --- |
| `fs.writeFile` | `{ path: string; content: string; reason?: string }` | Write or overwrite a UTF-8 text file. | Creates parent directories if needed. |
| `fs.readFile` | `{ path: string }` | Read file contents as text. | Keep payload small; read only when required. |
| `fs.listFiles` | `{ dir?: string }` | List directory contents. | Client may support recursive traversal. |
| `install.npm` | `{ packages: string[]; dev?: boolean }` | Install npm packages. | Spawn `npm i` inside WebContainers. |
| `run.sh` | `{ cmd: string; background?: boolean }` | Execute shell commands. | Stream output; background processes require UI controls. |
| `test.run` | `{ testFile?: string; watch?: boolean }` | Run project tests. | Align with Jest/Vitest configuration. |
| `plan.create` | `{ goal: string; steps: Step[]; risks?: string[]; fallbacks?: string[] }` | Emit multi-step plan metadata. | Client acknowledges; no execution. |

### Tool Execution Lifecycle

1. Agent emits `tool-call` event.
2. Client forwards to executor worker via BroadcastChannel.
3. Worker executes inside WebContainers (fs, shell, npm, tests).
4. Worker responds with `TOOL_RESULT` message containing `{ role: 'tool', tool_call_id, content | error }`.
5. Client appends result to `useChat` stream; agent continues reasoning.

---

## 7. Client Runtime Integration

### BroadcastChannel Protocol

```ts
// UI → Executor
channel.postMessage({
  type: 'EXECUTE_TOOL',
  payload: { toolCallId, name: toolName, args },
});

// Executor → UI
channel.postMessage({
  type: 'TOOL_RESULT',
  payload: {
    role: 'tool',
    tool_call_id: toolCallId,
    content: result,          // or
    error: { name, message }, // on failure
  },
});
```

### WebContainers Boot Sequence

```ts
const wc = await WebContainer.boot();
await wc.mount(initialFiles);

const shell = await wc.spawn('jsh');
shell.output.pipeTo(new WritableStream({
  write(chunk) {
    terminal.write(typeof chunk === 'string' ? chunk : new TextDecoder().decode(chunk));
  },
}));

terminal.onData((data) => shell.input.getWriter().write(data));
```

### Editor & Terminal

- **Editor (CodeMirror):** Autosave to `fs.writeFile` on blur/`Ctrl+S`; highlight lint errors.
- **Terminal (xterm.js):** Provide clear, copy, and "stop all" controls; show command echo.
- **Preview:** Subscribe to WebContainers `server-ready` events to surface preview URL (iframe).

---

## 8. Workspace Memory & Persistence

### Workspace State Schema

```ts
interface WorkspaceState {
  files: Record<string, string>;
  lastCommand?: string;
  serverRunning?: boolean;
  serverUrl?: string;
  installedPackages?: string[];
  openPorts?: number[];
  environment?: Record<string, string>;
}
```

### IndexedDB Layout

- **files** store (`path`, `content`, `lastModified`, optional `language`).
- **state** store (`key: 'workspace'`, workspace metadata).
- **conversations** store (chat transcripts + workspace snapshots).

Use `idb` helpers to persist and restore on load:

```ts
await db.put('files', { path: 'server.ts', content, lastModified: Date.now() });
const workspace = await db.get('state', 'workspace');
```

---

## 9. Security & Privacy

- Enforce cross-origin isolation headers:
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Cross-Origin-Embedder-Policy: require-corp`
- Never expose LLM API keys to the client; load from server-side environment variables only.
- Log tool invocations (name, args hash, duration, exit code) for audit trails.
- Prefer sending filenames and hashes over full file contents unless necessary.
- Offer optional command allowlist or confirmation dialog for sensitive shell commands.
- Provide "Stop All" action to terminate runaway background processes.

---

## 10. Error Handling & Resilience

- Wrap tool execution in timeouts (e.g., 30 seconds) and surface structured errors `{ name, message }`.
- Retry transient failures (network/IO) with jittered backoff.
- Encourage agent remediation: install missing packages, recreate files, re-run commands.
- Monitor resource limits; alert when memory or CPU exceeds thresholds.
- Capture background process IDs to allow targeted termination.

---

## 11. Testing & Verification

- **Unit tests:** Mock WebContainer APIs to validate tool executors and BroadcastChannel wiring.
- **Integration tests:** Simulate scaffold → install → run → validate workflows, including preview handling.
- **Failure scenarios:** Missing package, command exit code 1, test failures; verify agent proposes recovery steps.
- **Mode smoke tests:** Run identical prompts across modes to confirm behavioral differences and latency targets.
- **Accessibility:** Ensure editor, terminal, and controls meet WCAG 2.1 AA (focus states, ARIA labels, contrast).

---

## 12. Extending the Platform

### Adding a Tool

1. Declare tool schema on the server with Zod.
2. Implement executor branch in the WebContainers worker.
3. Return `{ role: 'tool', tool_call_id, content }` or structured error payloads.
4. Document usage, validation, and expected errors.

### Adding a Provider

- Keep Gemini as default; integrate additional providers (OpenAI-compatible, Ollama, Groq) via AI SDK `provider` routing.
- Select provider/model per request based on mode, latency, or capability requirements.

### Planning & Evaluation Enhancements

- Use `plan.create` before acting on complex tasks; surface plan in UI for operator approval.
- Add evaluator passes to diff files, run tests, or lint before finalizing responses.
- Store plan history for observability and rollback.

---

## Appendix: Reference Snippets

```ts
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

const google = createGoogleGenerativeAI({
  apiKey:
    process.env.GOOGLE_API_KEY ??
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ??
    process.env.GEMINI_API_KEY!,
});

// Mode configuration
const MODES = {
  fast:     { model: 'gemini-2.0-flash',             thinking: 0,    temp: 0.7 },
  balanced: { model: 'gemini-2.0-flash-thinking-exp', thinking: 2048, temp: 0.5 },
  deep:     { model: 'gemini-2.5-pro-exp',           thinking: 8192, temp: 0.3 },
} as const;

// Example system prompt builder
function systemPrompt(mode: keyof typeof MODES, ws: WorkspaceState) {
  const files = ws?.files ? Object.keys(ws.files) : [];
  return [
    'You are an expert coding agent with filesystem and shell tools.',
    `Mode: ${mode.toUpperCase()}`,
    `Capabilities: read/write files, run commands, install packages, run tests.`,
    `Workspace files: ${JSON.stringify(files)}`,
    `Last command: ${ws?.lastCommand ?? 'none'}`,
    `Server running: ${ws?.serverRunning ? 'yes' : 'no'}`,
    'Best practices: write complete code, validate steps, background servers, install before use.',
  ].join('\n');
}

// SSE handler (Next.js route)
export async function POST(req: NextRequest) {
  const { messages, mode = 'balanced', workspaceState = {} } = await req.json();
  const cfg = MODES[mode as keyof typeof MODES] ?? MODES.balanced;

  const finalMessages = [
    { role: 'system', content: systemPrompt(mode as keyof typeof MODES, workspaceState) },
    ...(messages ?? []),
  ];

  const result = await streamText({
    model: google(cfg.model),
    messages: finalMessages,
    tools,
    temperature: cfg.temp,
    maxSteps: 10,
    experimental_providerMetadata: {
      google: { thinkingConfig: { thinkingBudget: cfg.thinking, includeThoughts: mode === 'deep' } },
    },
  });

  return result.toAIStreamResponse({ headers: { 'X-Agent-Mode': mode } });
}

// BroadcastChannel worker sketch
bc.addEventListener('message', async (event) => {
  if (event.data?.type !== 'EXECUTE_TOOL') return;
  const { toolCallId, name, args } = event.data.payload;

  try {
    if (name === 'fs.writeFile') {
      await wc.fs.writeFile(args.path, args.content);
      return respond(toolCallId, `wrote ${args.path}`);
    }

    if (name === 'run.sh') {
      const proc = await wc.spawn('bash', ['-lc', args.cmd]);
      if (args.background) {
        pipeProcessToTerminal(proc, terminal);
        return respond(toolCallId, 'started');
      }

      const output = await collectOutput(proc);
      return respond(toolCallId, output);
    }

    // ...other tools...
  } catch (error: unknown) {
    return respondError(toolCallId, error);
  }
});
```

Keep this reference close when onboarding teammates, reviewing architecture proposals, or implementing new capabilities in the Gemini browser runtime.
