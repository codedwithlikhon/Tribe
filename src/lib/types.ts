import type { AgentRole } from '../types/messages';
import type {
  WorkspaceEntry,
  WorkspaceState,
  WorkspaceOperation,
  WorkspaceSnapshot,
  WorkspaceFile,
  WorkspaceDirectory,
} from '../types/workspace';
import type { ToolInvocation, ToolResult } from '../types/tools';

export type ChatRole = Extract<AgentRole, 'user' | 'assistant' | 'system'>;

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  actions?: ActionResult[];
  error?: string;
  createdAt?: number;
  metadata?: Record<string, string | number | boolean>;
}

export type FileNode = WorkspaceFile;
export type DirectoryNode = WorkspaceDirectory;
export type ProjectTree = WorkspaceDirectory;

export type ActionResult =
  | {
      type: 'createOrUpdateFile';
      path: string;
      content: string;
      status?: 'pending' | 'success' | 'error';
      message?: string;
    }
  | {
      type: 'deletePath';
      path: string;
      status?: 'pending' | 'success' | 'error';
      message?: string;
    }
  | {
      type: 'runCommand';
      command: string;
      cwd?: string;
      status?: 'pending' | 'success' | 'error';
      message?: string;
      output?: string;
    };

export interface AiActionResponse {
  reply: string;
  actions: ActionResult[];
  toolCalls?: ToolInvocation[];
  toolResults?: ToolResult[];
}

export interface FileSummary {
  path: string;
  size: number;
  preview: string;
  lastModified?: number;
}

export interface ChatRequestPayload {
  messages: Array<{ role: ChatRole; content: string }>;
  projectSummary: {
    files: FileSummary[];
    dependencies: string[];
  };
  userMessage: string;
  mode?: string;
}

export type {
  WorkspaceEntry,
  WorkspaceState,
  WorkspaceOperation,
  WorkspaceSnapshot,
  WorkspaceFile,
  WorkspaceDirectory,
  ToolInvocation,
  ToolResult,
};
