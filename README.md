# Tribe WebContainer Runtime

Tribe gives your AI agents a production-ready, in-browser runtime built on top of the WebContainer API. Provide an IDE-grade developer experience without managing servers, while keeping untrusted AI-generated code safely sandboxed directly in your users' browser tabs.

> Installing dependencies
>
> Booting WebContainer
>
> Running start command

**The best runtime for your AI agents.**

## Key features

- Native Node.js inside the browser running Node.js toolchains (for example, Webpack, Vite, and others)
- Flexible: build next-generation coding experiences powered by WebContainers
- Unmatched security: everything is contained in a browser tab
- Fast: spinning up the entire dev environment in milliseconds
- Always free for Open Source: you're the future of the web and we love you 💙

## WebContainers versus cloud VM approach

WebContainers enables you to build applications that previously required running VMs in the cloud to execute user code. Instead, WebContainers run entirely client-side, providing a number of benefits over the legacy cloud VM approach:

- **Unmatched user experience.** No latency. Faster than localhost. Works offline.
- **Cost effective.** Compute is done locally. No paying by the minute for cloud VMs.
- **Scales to millions.** Leverages modern CDN caching and client-side compute.
- **No risk of bad actors.** Say goodbyte to bitcoin miners, malware, and phishing sites.

## Quick start: boot a WebContainer workspace

1. **Install dependencies** inside the mounted project (package managers are already available in the container runtime).
2. **Boot a WebContainer** instance and mount your project files.
3. **Run the start command** (for example, `npm run dev`) to launch the experience that your AI agent or users will interact with.

The flow above mirrors the steps you would take in a local environment, but all commands execute inside the browser-based sandbox.

## Working with the WebContainer file system

WebContainer exposes an in-memory, POSIX-like file system accessible through a nested `FileSystemTree` object. Each top-level key is a path, with either a `file` or `directory` descriptor.

```js
const files = {
  'package.json': {
    file: {
      contents: '{ "name": "vite-starter" }',
    },
  },
  src: {
    directory: {
      'main.js': {
        file: {
          contents: "console.log('Hello from WebContainers!')",
        },
      },
    },
  },
};
```

Mount the tree at the project root (or an existing subfolder) to hydrate the workspace:

```js
await webcontainerInstance.mount(files);
```

You can also create folders on the fly and mount into them:

```js
await webcontainerInstance.fs.mkdir('my-mount-point');
await webcontainerInstance.mount(files, { mountPoint: 'my-mount-point' });
```

### Snapshotting projects

For faster cold starts, generate binary snapshots with `@webcontainer/snapshot` and serve them to the browser:

```ts
import { snapshot } from '@webcontainer/snapshot';

const folderSnapshot = await snapshot(SOURCE_CODE_FOLDER);

app.get('/snapshot', (req, res) => {
  res
    .setHeader('content-type', 'application/octet-stream')
    .send(folderSnapshot);
});

const webcontainer = await WebContainer.boot();
const snapshotResponse = await fetch('/snapshot');
const snapshotData = await snapshotResponse.arrayBuffer();

await webcontainer.mount(snapshotData);
```

### Core `fs` operations

- `readFile(path, encoding?)` – returns file contents (`Uint8Array` or string).
- `readdir(path, options?)` – enumerates directory entries; use `withFileTypes: true` for detailed `Dirent` objects.
- `writeFile(path, data, options?)` – writes or overwrites files at the given path.
- `rm(path, { recursive, force })` – deletes files or directories.
- `mkdir(path, { recursive })` – creates directories, optionally creating all missing parents.

These APIs mirror Node.js semantics, making it easy for generated code to manipulate the in-memory workspace safely.

## Building an AI chatbot with Google Generative AI

Tribe pairs naturally with the [AI SDK](https://ai-sdk.dev) and the `@ai-sdk/google` provider so your agents can generate, execute, and refine code in one place.

### Install the provider

Use your preferred package manager:

```bash
pnpm add @ai-sdk/google
# or
npm install @ai-sdk/google
# or
yarn add @ai-sdk/google
# or
bun add @ai-sdk/google
```

### Configure the provider instance

```ts
import { google } from '@ai-sdk/google';

const model = google('gemini-2.5-flash');
```

For custom environments, build an instance manually:

```ts
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta',
  headers: {
    'x-custom-header': 'value',
  },
});
```

Provider instances accept additional options per request, including safety settings, structured output toggles, response modalities, and advanced `thinkingConfig` controls for Gemini models.

### Generate text

```ts
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const { text } = await generateText({
  model: google('gemini-2.5-flash'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

To customize a call, add provider-specific settings:

```ts
await generateText({
  model: google('gemini-2.5-flash'),
  providerOptions: {
    google: {
      safetySettings: [
        {
          category: 'HARM_CATEGORY_UNSPECIFIED',
          threshold: 'BLOCK_LOW_AND_ABOVE',
        },
      ],
    },
  },
});
```

### Tooling capabilities

- **Thinking & reasoning** – adjust `thinkingConfig` to control token budgets and optional thought summaries.
- **File inputs** – attach PDFs or other files directly in prompts, or reference a YouTube URL for transcription-supported models.
- **Code execution** – enable Python execution via `google.tools.codeExecution({})` to let models calculate or verify answers.
- **Search grounding** – use `google.tools.googleSearch({})` for up-to-date answers with cited sources.
- **URL context** – provide up to 20 URLs that the model should inspect directly.

### Working with cached content

Gemini 2.5 models support both implicit caching (automatic token discounts when prompts share prefixes) and explicit caching via `GoogleAICacheManager`. Structure prompts with consistent prefixes to maximize cache hits, or create reusable caches for guaranteed savings.

### Embeddings & image generation

```ts
// Text embeddings
const embeddingModel = google.textEmbedding('gemini-embedding-001');

const { embedding } = await embed({
  model: embeddingModel,
  value: 'sunny day at the beach',
  providerOptions: {
    google: {
      outputDimensionality: 512,
      taskType: 'SEMANTIC_SIMILARITY',
    },
  },
});
```

```ts
// Imagen models
const result = await generateImage({
  model: google.image('imagen-3.0-generate-002'),
  prompt: 'A futuristic cityscape at sunset',
  providerOptions: {
    google: {
      personGeneration: 'dont_allow',
    },
  },
});
```

Gemma models are also available through the provider. System instructions are automatically prepended to the first user message so you can guide model behavior without extra boilerplate.

---

# API Reference | WebContainers

The public WebContainer API allows you to build custom applications on top of an in-browser Node.js runtime. Its main entry point is the `WebContainer` class.

---

## `WebContainer`

The main export of this library. An instance of `WebContainer` represents a runtime ready to be used.

### `WebContainer` properties

#### `fs: FileSystemAPI`

Gives access to the underlying file system.

#### `path: string`

The default value of the `PATH` environment variable for processes started through [`spawn`](#-spawn).

#### `workdir: string`

The full path to the working directory (see [FileSystemAPI](#filesystemapi)).

### `WebContainer` methods

#### `boot`

Boots a WebContainer. Only a single instance of WebContainer can be booted concurrently (see [`teardown`](#-teardown)). Booting WebContainer is an expensive operation.

**Signature**

```ts
static boot(options: BootOptions = {}): Promise<WebContainer>
```

**Return**

Returns a [`WebContainer`](#webcontainer) instance.

**`BootOptions`**

```ts
interface BootOptions {
  coep?: 'require-corp' | 'credentialless' | 'none';
  workdirName?: string;
  forwardPreviewErrors?: boolean | 'exceptions-only';
}
```

- `coep?: 'require-corp' | 'credentialless' | 'none'` – the value of the [COEP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy) header used to load your application. Choosing `'none'` will result in no cross-origin isolation headers being used. This will only work on Chromium-based browsers as long as an Origin Trial is supported. This value is fixed the first time a WebContainer is booted and cannot be changed in successive reboots.
- `workdirName?: string` – sets the folder name for the working directory of your WebContainer instance. If not provided, it will be auto-generated. This is mostly a cosmetic option.
- `forwardPreviewErrors?: boolean | 'exceptions-only'` – configure whether errors occurring in embedded preview iframes should be forwarded to the parent page. Captured errors originate from calls to `console.error`, any `unhandledrejection` events on `window`, and any uncaught `error` events on `window`. If set to `exceptions-only`, `console.error`s are not forwarded. Default value is `false`, so no errors are emitted.

To receive the events, register an event handler:

```js
webcontainerInstance.on('preview-message', (message) => {
  // process the message received from a preview
});
```

#### `mount`

Mounts a tree of files into the filesystem. This can be specified as a [FileSystemTree](#filesystemtree) object or as a binary snapshot generated by [`@webcontainer/snapshot`](https://www.npmjs.com/package/@webcontainer/snapshot).

**Signature**

```ts
mount(tree: FileSystemTree | Uint8Array | ArrayBuffer, options?: { mountPoint?: string }): Promise<void>
```

#### `on`

Listens for an `event`. The `listener` is called every time the `event` gets emitted.

**Signature**

```ts
on(
  event: 'port' | 'error' | 'server-ready' | 'preview-message',
  listener: PortListener | ErrorListener | ServerReadyListener | PreviewMessageListener
): () => void
```

Returns a function to unsubscribe from the events. Once unsubscribed, the `listener` will no longer be called.

**Overloads**

- `on(event: 'port', listener: PortListener): () => void` – listens for `port` events, which are emitted when a port is opened or closed by some process.

  ```ts
  type PortListener = (port: number, type: 'open' | 'close', url: string) => void;
  ```

- `on(event: 'error', listener: ErrorListener): () => void` – listens for `error` events, emitted when an internal error is triggered.

  ```ts
  type ErrorListener = (error: { message: string }) => void;
  ```

- `on(event: 'preview-message', listener: PreviewMessageListener): () => void` – listens for `preview-message` events, emitted when an internal error is triggered.

  ```ts
  type PreviewMessage = (
    | UncaughtExceptionMessage
    | UnhandledRejectionMessage
    | ConsoleErrorMessage
  ) & {
    previewId: string;
    port: number;
    pathname: string;
    search: string;
    hash: string;
  };
  ```

- `on(event: 'server-ready', listener: ServerReadyListener): () => void` – listens for `server-ready` events, emitted when a server was started and ready to receive traffic.

  ```ts
  type ServerReadyListener = (port: number, url: string) => void;
  ```

#### `spawn`

Spawns a process. When no `args` are provided, spawns a process without command-line arguments.

**Signature**

```ts
spawn(command: string, args: string[], options?: SpawnOptions): Promise<WebContainerProcess>
```

**Examples**

```js
const install = await webcontainerInstance.spawn('npm', ['i']);
const installWithoutArgs = await webcontainerInstance.spawn('yarn');
```

#### `export`

Exports the filesystem.

**Signature**

```ts
export(path: string, options?: ExportOptions): Promise<Uint8Array | FileSystemTree>
```

#### `setPreviewScript`

Configure a script to be injected inside all previews. After this function resolves, every preview iframe that is either added or reloaded will now include this extra script on all HTML responses.

**Signature**

```ts
setPreviewScript(scriptSrc: string, options?: PreviewScriptOptions): Promise<void>
```

#### `teardown`

Destroys the WebContainer instance, turning it unusable, and releases its resources.

**Signature**

```ts
teardown(): void
```

---

## `reloadPreview`

Reload the provided iframe by sending a message to the iframe and falling back to resetting the `src` if the iframe didn't respond in time.

**Signature**

```ts
reloadPreview(preview: HTMLIFrameElement, hardRefreshTimeout?: number): Promise<void>
```

---

## `configureAPIKey`

Configure an API key to be used for commercial usage of the WebContainer API.

**Signature**

```ts
configureAPIKey(key: string): void
```

---

## `auth`

The authentication API is exported under the `auth` namespace. It allows you to authenticate users visiting your website via StackBlitz.

### `auth.init`

Initializes the authentication for use in WebContainer.

```ts
init(options: AuthInitOptions): { status: 'need-auth' | 'authorized' } | AuthFailedError
```

```ts
interface AuthInitOptions {
  editorOrigin?: string;
  clientId: string;
  scope: string;
}
```

```ts
interface AuthFailedError {
  status: 'auth-failed';
  error: string;
  description: string;
}
```

### `auth.startAuthFlow`

Starts the OAuth flow.

```ts
startAuthFlow(options?: { popup?: boolean }): void
```

### `auth.loggedIn`

Returns a promise that resolves when the user authorized your application.

```ts
loggedIn(): Promise<void>
```

### `auth.logout`

Logs out the user and clears any credentials that were saved locally.

```ts
logout(options?: { ignoreRevokeError?: boolean }): Promise<void>
```

### `auth.on`

Listens for `logged-out` or `auth-failed` events.

```ts
on(
  event: 'logged-out' | 'auth-failed',
  listener: () => void | ((reason: { error: string; description: string }) => void)
): () => void
```

---

## `DirEnt`

A representation of a directory entry, mirroring the Node.js API.

- `name: string | Uint8Array` – the name of the file or directory.
- `isDirectory(): boolean` – whether the entry is a directory.
- `isFile(): boolean` – whether the entry is a file.

---

## `FileSystemAPI`

Interface to interact directly with the WebContainer file system.

### `mkdir`

Creates a new directory. If the directory already exists, it will throw an error.

```ts
mkdir(path: string, options?: { recursive?: boolean }): Promise<void>
```

### `readdir`

Reads a given directory and returns an array of its files and directories.

```ts
readdir(
  path: string,
  options?: { encoding?: BufferEncoding; withFileTypes?: boolean }
): Promise<Uint8Array[] | string[] | DirEnt<Uint8Array>[] | DirEnt<string>[]>
```

### `readFile`

Reads the file at the given path.

```ts
readFile(path: string, encoding?: BufferEncoding | null): Promise<Uint8Array | string>
```

### `rename`

Renames a file.

```ts
rename(oldPath: string, newPath: string): Promise<void>
```

### `rm`

Deletes a file or directory.

```ts
rm(path: string, options?: { force?: boolean; recursive?: boolean }): Promise<void>
```

### `writeFile`

Writes a file to the given path.

```ts
writeFile(
  path: string,
  data: string | Uint8Array,
  options?: { encoding?: null | BufferEncoding } | null
): Promise<void>
```

### `watch`

Watch for changes to a given file or directory.

```ts
watch(
  path: string,
  options: { encoding?: BufferEncoding | null; recursive?: boolean },
  listener: (event: 'rename' | 'change', filename: string | Buffer) => void
): Watcher
```

```ts
interface Watcher {
  close(): void;
}
```

---

## `FileSystemTree`

A tree-like structure to describe the contents of a folder to be mounted.

```ts
interface FileSystemTree {
  [name: string]: FileNode | SymlinkNode | DirectoryNode;
}
```

```ts
const tree = {
  myproject: {
    directory: {
      'foo.js': {
        file: {
          contents: 'const x = 1;',
        },
      },
      'bar.js': {
        file: {
          symlink: './foo.js',
        },
      },
      '.envrc': {
        file: {
          contents: 'ENVIRONMENT=staging',
        },
      },
    },
  },
  emptyFolder: {
    directory: {},
  },
};
```

---

## `FileNode`

```ts
interface FileNode {
  file: {
    contents: string | Uint8Array;
  };
}
```

Represents a file with contents.

---

## `SymlinkNode`

```ts
interface SymlinkNode {
  file: {
    symlink: string;
  };
}
```

Represents a symlink pointing to another location.

---

## `DirectoryNode`

```ts
interface DirectoryNode {
  directory: FileSystemTree;
}
```

Represents a directory node.

---

## `SpawnOptions`

```ts
interface SpawnOptions {
  cwd?: string;
  env?: Record<string, string | number | boolean>;
  output?: boolean;
  terminal?: { cols: number; rows: number };
}
```

### Properties

- `cwd?: string` – current working directory for the process, relative to `workdir`.
- `env?: Record<string, string | number | boolean>` – environment variables to set for the process.
- `output?: boolean` – when set to `false`, no terminal output is sent back to the process.
- `terminal?: { cols: number; rows: number }` – the size of the attached terminal.

---

## `ExportOptions`

```ts
interface ExportOptions {
  format?: 'json' | 'binary' | 'zip';
  includes?: string[];
  excludes?: string[];
}
```

### Properties

- `format?: 'json' | 'binary' | 'zip'` – the format of the exported data. The `json` and `binary` format can be used as `tree` when calling [`mount`](#-mount). The default value is `json`.
- `includes?: string[]` – globbing patterns to include files from within excluded folders.
- `excludes?: string[]` – globbing patterns to exclude files from the export.

---

## `PreviewScriptOptions`

```ts
interface PreviewScriptOptions {
  type?: 'module' | 'importmap';
  defer?: boolean;
  async?: boolean;
}
```

### Properties

- `type?: 'module' | 'importmap'` – the type attribute to use for the script.
- `defer?: boolean` – if set to true, the `defer` attribute will be set on the script tag.
- `async?: boolean` – if set to true, the `async` attribute will be set on the script tag.

---

## `WebContainerProcess`

A running process spawned in a `WebContainer` instance.

### Properties

- `exit: Promise<number>` – a promise for the exit code of the process.
- `input: WritableStream<string>` – an input stream for the attached pseudoterminal device.
- `output: ReadableStream<string>` – a stream that receives all terminal output.

### Methods

- `kill(): void` – kills the process.
- `resize(dimensions: { cols: number; rows: number }): void` – resizes the attached terminal.

---

## `BufferEncoding`

```ts
type BufferEncoding =
  | 'ascii'
  | 'utf8'
  | 'utf-8'
  | 'utf16le'
  | 'ucs2'
  | 'ucs-2'
  | 'base64'
  | 'base64url'
  | 'latin1'
  | 'binary'
  | 'hex';
```

---

With Tribe, you can combine a WebContainer-powered runtime, AI SDK integrations, and rich Google Generative AI tooling to deliver responsive, secure developer experiences for your agents and end users.
