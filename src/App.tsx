import { useCallback, useMemo, useState } from 'react';
import { ChatPanel } from './components/ChatPanel';
import { FileExplorer } from './components/FileExplorer';
import { EditorPanel } from './components/EditorPanel';
import { TerminalPanel } from './components/TerminalPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { useWebContainer } from './hooks/useWebContainer';
import { requestAiActions } from './lib/aiClient';
import type { ActionResult, ChatMessage, ChatRequestPayload } from './lib/types';
import type { FileNode } from './lib/types';
import { v4 as uuid } from 'uuid';

const SYSTEM_MESSAGE = `You are Tribe, an AI pair programmer that controls a WebContainer sandbox running entirely inside the user's browser.\n\nThe user can run npm/yarn/pnpm commands, scaffold projects, edit files, and open previews.\n\nReturn a JSON object that matches the provided schema. Focus on actionable instructions. Use runCommand when dependencies need to be installed or dev servers started. Always include a helpful natural language reply in the reply field. Keep file contents compact when possible.`;

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

export default function App() {
  const {
    status,
    error,
    fileTree,
    fileSummaries,
    writeFile,
    applyActions,
    getFileContent,
    terminalOutput,
    previewUrl,
    refreshProjectTree,
  } = useWebContainer();

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: uuid(), role: 'system', content: SYSTEM_MESSAGE },
  ]);
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
            .filter((msg) => msg.role !== 'system')
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
    <div className="app-shell">
      <aside className="sidebar">
        <h2>Runtime status</h2>
        <div className="status-bar">
          Status: <strong>{status}</strong>
        </div>
        {error ? <div className="action-log-entry">{error}</div> : null}
        <FileExplorer tree={fileTree} selectedPath={selectedFilePath} onSelect={handleSelectFile} />
      </aside>
      <main className="main-content">
        <ChatPanel messages={messages.filter((msg) => msg.role !== 'system')} onSend={handleSendMessage} isProcessing={isProcessing} actionLog={actionLog} />
        <EditorPanel path={selectedFilePath} content={editorDraft} onChange={setEditorDraft} onSave={handleSaveEditor} isSaving={isSaving} />
        <TerminalPanel output={terminalOutput} />
        <PreviewPanel url={previewUrl} />
      </main>
    </div>
  );
}
