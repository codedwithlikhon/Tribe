import { useCallback, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { ChatPanel } from './ChatPanel';
import { EditorPanel } from './EditorPanel';
import { FileExplorer } from './FileExplorer';
import { PreviewPanel } from './PreviewPanel';
import { TerminalPanel } from './TerminalPanel';
import { useWebContainer } from '../hooks/useWebContainer';
import { requestAiActions } from '../lib/aiClient';
import type { ActionResult, ChatMessage, ChatRequestPayload, FileNode } from '../lib/types';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const SYSTEM_MESSAGE = `You are Tribe, an AI pair programmer that controls a WebContainer sandbox running entirely inside the user's browser.\n\nAlways scaffold production-ready Next.js 15 applications styled with Tailwind CSS, shadcn/ui, and Geist design tokens unless the user explicitly requests another stack.\n\nReturn a JSON object that matches the provided schema. Focus on actionable instructions. Use runCommand when dependencies need to be installed or dev servers started. Always include a helpful natural language reply in the reply field. Keep file contents compact when possible.`;

interface WorkspaceAppProps {
  onExit: () => void;
}

export function WorkspaceApp({ onExit }: WorkspaceAppProps) {
  const { status, error, fileTree, fileSummaries, writeFile, applyActions, getFileContent, terminalOutput, previewUrl, refreshProjectTree } =
    useWebContainer();
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: uuid(), role: 'system', content: SYSTEM_MESSAGE }]);
  const [actionLog, setActionLog] = useState<ActionResult[]>([]);
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
  const [editorDraft, setEditorDraft] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const packageJsonContent = useMemo(() => getFileContent('package.json'), [getFileContent]);
  const dependencies = useMemo(() => parseDependenciesFromPackage(packageJsonContent), [packageJsonContent]);

  const handleSelectFile = useCallback(
    (node: FileNode) => {
      setSelectedFilePath(node.path);
      setEditorDraft(getFileContent(node.path));
    },
    [getFileContent]
  );

  const handleSaveEditor = useCallback(async () => {
    if (!selectedFilePath) return;
    setIsSaving(true);
    try {
      await writeFile(selectedFilePath, editorDraft);
      await refreshProjectTree();
    } catch (err) {
      console.error('Failed to save file', err);
    } finally {
      setIsSaving(false);
    }
  }, [selectedFilePath, editorDraft, writeFile, refreshProjectTree]);

  const handleSendMessage = useCallback(
    async (message: string) => {
      const userMessage: ChatMessage = { id: uuid(), role: 'user', content: message };
      setMessages((prev) => [...prev, userMessage]);
      setIsProcessing(true);

      try {
        const payload: ChatRequestPayload = {
          messages: messages
            .map((msg) => ({ role: msg.role, content: msg.content }))
            .concat({ role: 'user', content: message }),
          projectSummary: {
            files: fileSummaries,
            dependencies,
          },
          userMessage: message,
        };

        const aiResponse = await requestAiActions(payload);
        const assistantMessageId = uuid();
        const assistantMessage: ChatMessage = {
          id: assistantMessageId,
          role: 'assistant',
          content: aiResponse.reply,
          actions: [],
        };
        setMessages((prev) => [...prev, assistantMessage]);

        if (aiResponse.actions?.length) {
          const executedActions: ActionResult[] = [];
          await applyActions(aiResponse.actions, (action) => {
            executedActions.push(action);
            setActionLog((prev) => [...prev.slice(-19), action]);
            setMessages((prev) =>
              prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, actions: [...executedActions] } : msg))
            );
            if (action.type === 'createOrUpdateFile' && action.path === selectedFilePath) {
              setEditorDraft(action.content);
            }
          });
          await refreshProjectTree();
        }
      } catch (err) {
        console.error('Chat request failed', err);
        setMessages((prev) => [
          ...prev,
          {
            id: uuid(),
            role: 'assistant',
            content: 'I ran into an issue fulfilling that request.',
            error: err instanceof Error ? err.message : String(err),
          },
        ]);
      } finally {
        setIsProcessing(false);
      }
    },
    [applyActions, dependencies, fileSummaries, messages, refreshProjectTree, selectedFilePath]
  );

  return (
    <div className="workspace-page">
      <header className="workspace-header">
        <div>
          <span className="workspace-label">Workspace</span>
          <span className="workspace-status">Status: {status}</span>
        </div>
        <button type="button" className="ghost-button" onClick={onExit}>
          Back to landing
        </button>
      </header>
      <div className="app-shell">
        <aside className="sidebar">
          <h2>Runtime status</h2>
          <div className="status-bar">
            Status: <strong>{status}</strong>
          </div>
          {error ? (
            <Alert variant="destructive" role="alert">
              <AlertTitle>Workspace error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}
          <FileExplorer tree={fileTree} selectedPath={selectedFilePath} onSelect={handleSelectFile} />
        </aside>
        <main className="main-content">
          <ChatPanel
            messages={messages.filter((msg) => msg.role !== 'system')}
            onSend={handleSendMessage}
            isProcessing={isProcessing}
            actionLog={actionLog}
          />
          <EditorPanel
            path={selectedFilePath}
            content={editorDraft}
            onChange={setEditorDraft}
            onSave={handleSaveEditor}
            isSaving={isSaving}
          />
          <TerminalPanel output={terminalOutput} />
          <PreviewPanel url={previewUrl} />
        </main>
      </div>
    </div>
  );
}

function parseDependenciesFromPackage(content: string | undefined): string[] {
  if (!content) return [];
  try {
    const pkg = JSON.parse(content);
    return [pkg.dependencies, pkg.devDependencies]
      .filter(Boolean)
      .flatMap((deps: Record<string, string>) => Object.entries(deps).map(([name, version]) => `${name}@${version}`));
  } catch (error) {
    console.warn('Failed to parse package.json', error);
    return [];
  }
}
