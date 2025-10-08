import { z } from 'zod';

export type WorkspaceFileKind = 'file' | 'directory';

export interface WorkspaceFileBase {
  path: string;
  name: string;
  lastModified: number;
}

export interface WorkspaceFile extends WorkspaceFileBase {
  kind: 'file';
  language: string;
  content: string;
  size: number;
}

export interface WorkspaceDirectory extends WorkspaceFileBase {
  kind: 'directory';
  children: WorkspaceEntry[];
}

export type WorkspaceEntry = WorkspaceFile | WorkspaceDirectory;

export interface WorkspaceSnapshot {
  id: string;
  createdAt: number;
  entries: WorkspaceEntry[];
  activePath?: string;
  openPaths: string[];
}

export type WorkspaceOperationType =
  | 'create-file'
  | 'update-file'
  | 'delete-path'
  | 'rename-path'
  | 'run-command';

export interface WorkspaceOperationBase {
  id: string;
  type: WorkspaceOperationType;
  createdAt: number;
  updatedAt: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  error?: string;
}

export interface CreateOrUpdateFileOperation extends WorkspaceOperationBase {
  type: 'create-file' | 'update-file';
  path: string;
  content: string;
  language: string;
}

export interface DeletePathOperation extends WorkspaceOperationBase {
  type: 'delete-path';
  path: string;
}

export interface RenamePathOperation extends WorkspaceOperationBase {
  type: 'rename-path';
  from: string;
  to: string;
}

export interface RunCommandOperation extends WorkspaceOperationBase {
  type: 'run-command';
  command: string;
  cwd: string;
  output: string[];
}

export type WorkspaceOperation =
  | CreateOrUpdateFileOperation
  | DeletePathOperation
  | RenamePathOperation
  | RunCommandOperation;

export interface WorkspaceState {
  id: string;
  name: string;
  version: number;
  snapshot: WorkspaceSnapshot;
  operations: WorkspaceOperation[];
  pendingSave: boolean;
}

export const workspaceFileSchema: z.ZodType<WorkspaceFile> = z.object({
  kind: z.literal('file'),
  path: z.string(),
  name: z.string(),
  lastModified: z.number().int(),
  language: z.string(),
  content: z.string(),
  size: z.number().int().nonnegative(),
});

export const workspaceDirectorySchema: z.ZodType<WorkspaceDirectory> = z.lazy(() =>
  z.object({
    kind: z.literal('directory'),
    path: z.string(),
    name: z.string(),
    lastModified: z.number().int(),
    children: z.array(workspaceEntrySchema),
  }),
);

export const workspaceEntrySchema: z.ZodType<WorkspaceEntry> = z.union([
  workspaceFileSchema,
  workspaceDirectorySchema,
]);

export const workspaceSnapshotSchema: z.ZodType<WorkspaceSnapshot> = z.object({
  id: z.string(),
  createdAt: z.number().int(),
  entries: z.array(workspaceEntrySchema),
  activePath: z.string().optional(),
  openPaths: z.array(z.string()),
});

export const workspaceOperationSchema: z.ZodType<WorkspaceOperation> = z.discriminatedUnion('type', [
  z.object({
    id: z.string(),
    type: z.literal('create-file'),
    createdAt: z.number().int(),
    updatedAt: z.number().int(),
    status: z.enum(['pending', 'running', 'completed', 'failed']),
    error: z.string().optional(),
    path: z.string(),
    content: z.string(),
    language: z.string(),
  }),
  z.object({
    id: z.string(),
    type: z.literal('update-file'),
    createdAt: z.number().int(),
    updatedAt: z.number().int(),
    status: z.enum(['pending', 'running', 'completed', 'failed']),
    error: z.string().optional(),
    path: z.string(),
    content: z.string(),
    language: z.string(),
  }),
  z.object({
    id: z.string(),
    type: z.literal('delete-path'),
    createdAt: z.number().int(),
    updatedAt: z.number().int(),
    status: z.enum(['pending', 'running', 'completed', 'failed']),
    error: z.string().optional(),
    path: z.string(),
  }),
  z.object({
    id: z.string(),
    type: z.literal('rename-path'),
    createdAt: z.number().int(),
    updatedAt: z.number().int(),
    status: z.enum(['pending', 'running', 'completed', 'failed']),
    error: z.string().optional(),
    from: z.string(),
    to: z.string(),
  }),
  z.object({
    id: z.string(),
    type: z.literal('run-command'),
    createdAt: z.number().int(),
    updatedAt: z.number().int(),
    status: z.enum(['pending', 'running', 'completed', 'failed']),
    error: z.string().optional(),
    command: z.string(),
    cwd: z.string(),
    output: z.array(z.string()),
  }),
]);

export const workspaceStateSchema: z.ZodType<WorkspaceState> = z.object({
  id: z.string(),
  name: z.string(),
  version: z.number().int().nonnegative(),
  snapshot: workspaceSnapshotSchema,
  operations: z.array(workspaceOperationSchema),
  pendingSave: z.boolean(),
});
