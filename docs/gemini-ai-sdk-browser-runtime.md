# Gemini + AI SDK Agents + Browser Runtime Reference

A single-page reference for engineers building or operating the Gemini-powered, browser-native AI development environment. It combines an LLM-orchestrated control plane with in-tab execution powered by WebContainers. Use this document as a practical guide when designing features, wiring tools, or maintaining the stack.

---

## 1. Overview & Purpose

**What it is.** A Next.js-hosted control surface that streams Gemini (AI SDK Agents) plans and tool calls to a browser runtime. The browser executes all filesystem and shell operations inside WebContainers, keeping code local to the tab.

**Why this architecture.**
- **Low latency & privacy:** Commands execute in the browser; the server never runs user code.
- **Rich capability set:** The agent can scaffold projects, run tests, and inspect outputs using declarative tool schemas.
- **Deterministic control:** Every tool invocation is explicit, logged, and can be gated by user permissions.

**Goals for v2.**
- Mode selector (fast / balanced / deep) with thinking-budget metadata.
- Multi-step planning and execution via `plan.create`.
- Persistent workspace memory (files, last commands, server state).
- Artifact inventory wired to editor and terminal panes.
- Extensible tool set (fs, shell, npm, tests) with defensive error handling.

**Out of scope.**
- Executing arbitrary user code on the server.
- Long-term cloud persistence (use export/import instead).
- Multi-agent orchestration beyond planner/executor pairs.

---

## 2. Core Architecture

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

### Server (Next.js)
- Hosts `/api/ai` (streaming agent) and optional `/api/ai` `PUT` planner endpoint.
- Uses AI SDK Agents with Gemini models chosen per mode.
- Streams assistant tokens, tool call objects, and metadata headers.
- Summarizes workspace state (files, last command, server status) into the system prompt on each request.

### Client (Browser)
- Boots WebContainers once per tab; mounts workspace files into its virtual FS.
- Executes tool calls for filesystem, npm install, shell commands, and tests.
- Pipes process output into xterm.js; syncs files with CodeMirror.
- Shares tool-call payloads via `BroadcastChannel` (`agency-tools`) between chat UI and executor worker.

---

## 3. Agent Modes

| Mode      | Model                  | Thinking Budget | Temperature | Primary Use Case |
|-----------|------------------------|-----------------|-------------|------------------|
| fast      | `gemini-2.0-flash-exp` | 0               | 0.7         | Quick edits, scaffolds, simple refactors |
| balanced  | `gemini-2.5-flash`     | 2048            | 0.5         | General development with reasoning |
| deep      | `gemini-2.5-pro`       | 8192            | 0.3         | Complex planning, architecture changes, debugging |

**Thinking budget** surfaces as metadata (chain-of-thought token allotment) but remains hidden from users. Higher budgets improve planning at the cost of latency.

---

## 4. Usage Guide

1. **Initialize the runtime.** Boot WebContainers, mount seed files, and start the terminal shell (`jsh` or `bash -lc`).
2. **Bind the chat hook.** Use `useChat` (AI SDK React) with `api: '/api/ai'`, injecting `mode` and `workspaceState` in the `body` initializer.
3. **Relay tool calls.** In `onToolCall`, forward `{ toolName, args, toolCallId }` to the executor via `BroadcastChannel`.
4. **Execute tools.** The executor handles FS, shell, npm, and test commands inside WebContainers and posts structured results back.
5. **Stream responses.** Append server tokens and tool results to the transcript; surface terminal output and artifact updates in the UI.
6. **Persist state.** Mirror active files, last command, and server status into IndexedDB so the workspace can be restored after reloads.
7. **Offer previews.** Listen for `server-ready` events to wire running dev servers into embedded iframes.

---

## 5. Tooling & Execution Model

**Server-defined tool schemas** (validated with Zod):
- `fs.writeFile` – Write or overwrite text files; creates parent directories.
- `fs.readFile` – Return file contents as UTF-8 text.
- `fs.listFiles` – Enumerate directory entries (optional recursive in client).
- `install.npm` – Install npm packages (`dev` flag for devDependencies).
- `run.sh` – Run shell commands (foreground or background).
- `test.run` – Invoke test runners with optional file/watch flags.
- `plan.create` – Request a multi-step execution plan from the model.

**Client execution loop:**
1. Receive tool call via chat hook.
2. Post to executor worker.
3. Run within WebContainers.
4. Return `{ role: 'tool', tool_call_id, content | error }` back to the agent stream.
5. Agent consumes result and decides the next action.

**Error handling.** Propagate structured errors (`{ name, message }`) so the agent can propose recovery (e.g., install missing dependency, retry command). Apply exponential backoff retries for transient issues.

---

## 6. API Contract

### POST `/api/ai`
- **Request:** `{ messages, mode, workspaceState }`.
- **Behavior:** Prepends dynamic system prompt, selects model/temperature/thinking budget from `mode`, streams assistant tokens and tool calls via SSE.
- **Response:** `text/event-stream` with `text-delta`, `tool-call`, `tool-result` (echoed by client), and `finish` events. Headers may include `X-Agent-Mode` and thinking metadata.

### PUT `/api/ai` (Planner)
- **Request:** `{ goal, context }` describing the desired outcome and current workspace.
- **Response:** JSON plan with ordered steps, dependencies, tool hints, validation criteria, risks, and fallback strategies.

---

## 7. Workspace Memory & Artifacts

- `workspaceState` mirrors lightweight file listings, last shell command, server status, installed packages, and open ports.
- Artifacts panel lists generated files (or hashes) with timestamps; clicking opens the file in the editor.
- Persistence strategies:
  - **Volatile:** In-memory only (default).
  - **Durable:** Sync file tree to IndexedDB and restore on load.
  - **Export/Import:** Offer ZIP download/upload for portability.

---

## 8. Frontend Integration Patterns

- **useChat hook:** Centralizes streaming, tool call interception, and optimistic UI updates.
- **BroadcastChannel protocol:**
  - Outgoing: `{ type: 'EXECUTE_TOOL', payload: { name, args, toolCallId } }`
  - Incoming: `{ type: 'TOOL_RESULT', payload: { role: 'tool', tool_call_id, content | error } }`
- **Editor:** Use CodeMirror with autosave to `fs.writeFile` on blur/`Ctrl+S`.
- **Terminal:** xterm.js pipes WebContainer process streams; provide clear, stop, and background process controls.
- **Server previews:** Update preview iframe SRC when WebContainers emits `server-ready` with `{ port, url }`.
- **Headers:** Ensure `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` for SharedArrayBuffer support.

---

## 9. Design Rationale

- **In-browser execution:** Mitigates server risk, eliminates cold starts, and keeps latency low.
- **Agent-first workflows:** Structured tool calls and optional plans separate reasoning from execution, improving resilience and observability.
- **Mode controls:** Operators trade speed for depth; deep mode excels at debugging and refactors, while fast mode favors immediacy.
- **Extensible tooling:** Adding a tool requires only schema definition (server) and executor implementation (client), allowing incremental capability growth.

---

## 10. Operations, Security & Privacy

- Require COOP/COEP headers for WebContainer isolation.
- Optional command allowlist or confirmation prompts before executing sensitive shell commands.
- Monitor resource usage (CPU, memory); provide a "Stop All" action to kill background processes.
- Log tool calls with duration, arguments, and exit codes for auditability.
- Default to privacy: do not send full file contents to the server unless explicitly requested; prefer filenames/hashes in workspace summaries.

---

## 11. Testing & Local Development

- **Unit tests:** Mock WebContainer APIs to verify tool executors.
- **E2E flows:** Cover scaffold → install → run → validate path, including preview updates.
- **Error recovery:** Simulate missing package errors, command failures, and ensure the agent proposes corrective actions.
- **Mode smoke tests:** Run identical prompts in fast, balanced, and deep modes to confirm behavioral differences.
- **Local dev:** Run `npm install`, then start Vite + Express via `npm run dev`; ensure `.env` carries provider credentials (Gemini/Groq/Cohere).

---

## 12. Extending the Agent

- **Add a tool:** Define schema server-side, implement WebContainer executor, and return structured results with matching `tool_call_id`.
- **Add a provider:** Keep Gemini as default; optionally add OpenAI-compatible or Ollama providers and route per-request.
- **Add planning/evaluation:** Use planner output to gate execution, and optionally run evaluator passes that diff files or verify test outcomes before finalizing responses.

---

## 13. Quick Reference Snippets

```ts
// Mode map (server)
const MODES = {
  fast:     { model: 'gemini-2.0-flash-exp', thinking: 0,    temp: 0.7 },
  balanced: { model: 'gemini-2.5-flash',      thinking: 2048, temp: 0.5 },
  deep:     { model: 'gemini-2.5-pro',        thinking: 8192, temp: 0.3 },
} as const;

// Client BroadcastChannel message
bc.postMessage({
  type: 'EXECUTE_TOOL',
  payload: { name: tool.name, args: tool.args, toolCallId: tool.id },
});
```

Keep this guide handy when onboarding new engineers, reviewing feature proposals, or planning production hardening efforts.
