export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  actions?: ActionResult[];
  error?: string;
}

export type FileNode = {
  type: 'file';
  path: string;
  name: string;
  content: string;
};

export type DirectoryNode = {
  type: 'directory';
  path: string;
  name: string;
  children: Array<FileNode | DirectoryNode>;
};

export type ProjectTree = DirectoryNode;

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
}
