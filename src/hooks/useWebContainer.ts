import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { WebContainer, WebContainerProcess, FileSystemTree } from '@webcontainer/api';
import { dirname } from 'path-browserify';
import type { ActionResult, DirectoryNode, FileNode, FileSummary } from '../lib/types';

const DEFAULT_FILES: FileSystemTree = {
  'package.json': {
    file: {
      contents: JSON.stringify(
        {
          name: 'webcontainer-project',
          version: '1.0.0',
          private: true,
          type: 'module',
          scripts: {
            dev: "vite --host",
            build: 'vite build',
            preview: 'vite preview --host',
          },
          dependencies: {},
          devDependencies: {},
        },
        null,
        2
      ),
    },
  },
  'README.md': {
    file: {
      contents: `# Welcome to the Tribe WebContainer workspace\n\n- Ask the assistant to scaffold a project\n- Run commands such as \`npm install\` or \`npm run dev\`\n- Open the preview once a dev server boots\n`,
    },
  },
  src: {
    directory: {
      'index.js': {
        file: {
          contents: "console.log('Hello from WebContainers!');\n",
        },
      },
    },
  },
};

const IGNORED_DIRECTORIES = new Set(['node_modules', '.git', '.cache', '.pnpm-store']);

function createEmptyTree(): DirectoryNode {
  return {
    type: 'directory',
    name: '/',
    path: '/',
    children: [],
  };
}

function insertFileNode(root: DirectoryNode, filePath: string, content: string): DirectoryNode {
  const segments = filePath.replace(/^\/+/, '').split('/');
  const newRoot: DirectoryNode = JSON.parse(JSON.stringify(root));
  let current = newRoot;

  segments.forEach((segment, index) => {
    const isFile = index === segments.length - 1;
    const currentPath = '/' + segments.slice(0, index + 1).join('/');

    if (isFile) {
      const existingIndex = current.children.findIndex((child) => child.name === segment && child.type === 'file');
      const fileNode: FileNode = {
        type: 'file',
        name: segment,
        path: currentPath,
        content,
      };
      if (existingIndex >= 0) {
        current.children[existingIndex] = fileNode;
      } else {
        current.children.push(fileNode);
      }
    } else {
      let next = current.children.find((child) => child.name === segment && child.type === 'directory') as
        | DirectoryNode
        | undefined;
      if (!next) {
        next = {
          type: 'directory',
          name: segment,
          path: currentPath,
          children: [],
        };
        current.children.push(next);
      }
      current = next;
    }
  });

  return newRoot;
}

function removeNode(root: DirectoryNode, targetPath: string): DirectoryNode {
  const newRoot: DirectoryNode = JSON.parse(JSON.stringify(root));

  function helper(node: DirectoryNode): boolean {
    node.children = node.children.filter((child) => {
      if (child.path === targetPath) {
        return false;
      }
      if (child.type === 'directory') {
        const shouldKeep = helper(child);
        return shouldKeep;
      }
      return true;
    });
    return true;
  }

  helper(newRoot);
  return newRoot;
}

async function ensureDirectory(instance: WebContainer, path: string) {
  if (path === '.' || path === '/' || !path) {
    return;
  }
  const segments = path.split('/');
  let current = '';
  for (const segment of segments) {
    if (!segment) continue;
    current = current ? `${current}/${segment}` : segment;
    try {
      await instance.fs.mkdir(current);
    } catch (error) {
      // Directory already exists
    }
  }
}

async function readAllFiles(instance: WebContainer, baseDir = '.'): Promise<Record<string, string>> {
  const fileMap: Record<string, string> = {};

  const walk = async (dir: string) => {
    const entries = await instance.fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (IGNORED_DIRECTORIES.has(entry.name)) {
        continue;
      }
      const fullPath = dir === '.' ? entry.name : `${dir}/${entry.name}`;
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile()) {
        const contents = await instance.fs.readFile(fullPath, 'utf-8');
        fileMap[`/${fullPath}`] = contents;
      }
    }
  };

  await walk(baseDir);
  return fileMap;
}

function buildTreeFromFileMap(fileMap: Record<string, string>): DirectoryNode {
  let tree = createEmptyTree();
  const sortedPaths = Object.keys(fileMap).sort();
  for (const path of sortedPaths) {
    tree = insertFileNode(tree, path, fileMap[path]);
  }
  return tree;
}

export function useWebContainer() {
  const [status, setStatus] = useState<'idle' | 'booting' | 'ready' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const instanceRef = useRef<WebContainer | null>(null);
  const [fileTree, setFileTree] = useState<DirectoryNode>(createEmptyTree());
  const [fileMap, setFileMap] = useState<Record<string, string>>({});
  const [terminalOutput, setTerminalOutput] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const processRef = useRef<WebContainerProcess | null>(null);

  const boot = useCallback(async () => {
    if (instanceRef.current) {
      return instanceRef.current;
    }
    setStatus('booting');
    try {
      const webcontainerModule = await import('@webcontainer/api');
      const webcontainer = await webcontainerModule.WebContainer.boot();
      instanceRef.current = webcontainer;

      webcontainer.on('server-ready', (_port, url) => {
        setPreviewUrl(url);
      });

      webcontainer.on('server-crash', (process) => {
        setTerminalOutput((prev) => `${prev}\nProcess crashed with code ${process.exitCode}`);
      });

      await webcontainer.mount(DEFAULT_FILES);
      const initialFiles = await readAllFiles(webcontainer);
      setFileMap(initialFiles);
      setFileTree(buildTreeFromFileMap(initialFiles));
      setStatus('ready');
      return webcontainer;
    } catch (err) {
      console.error('Failed to boot WebContainer', err);
      setError(err instanceof Error ? err.message : String(err));
      setStatus('error');
      throw err;
    }
  }, []);

  useEffect(() => {
    void boot();
  }, [boot]);

  useEffect(() => {
    return () => {
      if (processRef.current) {
        processRef.current.kill();
        processRef.current = null;
      }
      if (instanceRef.current) {
        instanceRef.current.teardown();
        instanceRef.current = null;
      }
    };
  }, []);

  const refreshProjectTree = useCallback(async () => {
    if (!instanceRef.current) return;
    const files = await readAllFiles(instanceRef.current);
    setFileMap(files);
    setFileTree(buildTreeFromFileMap(files));
  }, []);

  const writeFile = useCallback(
    async (path: string, content: string) => {
      const instance = await boot();
      const normalizedPath = path.replace(/^\/+/, '');
      const directoryName = dirname(normalizedPath);
      if (directoryName && directoryName !== '.') {
        await ensureDirectory(instance, directoryName);
      }
      await instance.fs.writeFile(normalizedPath, content);
      setFileMap((prev) => ({ ...prev, [`/${normalizedPath}`]: content }));
      setFileTree((prev) => insertFileNode(prev, `/${normalizedPath}`, content));
    },
    [boot]
  );

  const deletePath = useCallback(
    async (path: string) => {
      const instance = await boot();
      const normalizedPath = path.replace(/^\/+/, '');
      await instance.fs.rm(normalizedPath, { recursive: true, force: true });
      setFileMap((prev) => {
        const clone = { ...prev };
        delete clone[`/${normalizedPath}`];
        return clone;
      });
      setFileTree((prev) => removeNode(prev, `/${normalizedPath}`));
    },
    [boot]
  );

  const runCommand = useCallback(
    async (command: string, cwd?: string) => {
      const instance = await boot();
      if (processRef.current) {
        processRef.current.kill();
        processRef.current = null;
      }
      setTerminalOutput('');

      const shellCommand = ['-lc', command];
      const process = await instance.spawn('bash', shellCommand, {
        cwd,
        terminal: {
          cols: 120,
          rows: 40,
        },
      });
      processRef.current = process;

      const reader = process.output.getReader();
      let output = '';

      const read = async () => {
        const { value, done } = await reader.read();
        if (done) {
          reader.releaseLock();
          return;
        }
        if (value) {
          output += value;
          setTerminalOutput((prev) => prev + value);
        }
        await read();
      };

      read().catch((err) => {
        console.error('Error reading process output', err);
      });

      const exitCode = await process.exit;
      processRef.current = null;
      await refreshProjectTree();
      return { exitCode, output };
    },
    [boot, refreshProjectTree]
  );

  const applyActions = useCallback(
    async (actions: ActionResult[], onUpdate?: (action: ActionResult) => void) => {
      for (const action of actions) {
        if (action.type === 'createOrUpdateFile') {
          try {
            onUpdate?.({ ...action, status: 'pending' });
            await writeFile(action.path, action.content);
            onUpdate?.({ ...action, status: 'success', message: 'File written' });
          } catch (err) {
            onUpdate?.({
              ...action,
              status: 'error',
              message: err instanceof Error ? err.message : String(err),
            });
          }
        } else if (action.type === 'deletePath') {
          try {
            onUpdate?.({ ...action, status: 'pending' });
            await deletePath(action.path);
            onUpdate?.({ ...action, status: 'success', message: 'Deleted path' });
          } catch (err) {
            onUpdate?.({
              ...action,
              status: 'error',
              message: err instanceof Error ? err.message : String(err),
            });
          }
        } else if (action.type === 'runCommand') {
          try {
            onUpdate?.({ ...action, status: 'pending' });
            const { exitCode, output } = await runCommand(action.command, action.cwd);
            onUpdate?.({
              ...action,
              status: exitCode === 0 ? 'success' : 'error',
              message: `Exited with code ${exitCode}`,
              output,
            });
          } catch (err) {
            onUpdate?.({
              ...action,
              status: 'error',
              message: err instanceof Error ? err.message : String(err),
            });
          }
        }
      }
    },
    [deletePath, runCommand, writeFile]
  );

  const getFileContent = useCallback(
    (path: string) => {
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;
      return fileMap[normalizedPath] ?? '';
    },
    [fileMap]
  );

  const fileSummaries = useMemo<FileSummary[]>(() => {
    return Object.entries(fileMap).map(([path, content]) => ({
      path,
      size: content.length,
      preview: content.slice(0, 280),
    }));
  }, [fileMap]);

  return {
    status,
    error,
    boot,
    fileTree,
    fileSummaries,
    writeFile,
    deletePath,
    runCommand,
    applyActions,
    getFileContent,
    terminalOutput,
    previewUrl,
    refreshProjectTree,
  };
}
