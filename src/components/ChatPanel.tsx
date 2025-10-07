import { FormEvent, useEffect, useMemo, useState } from 'react';
import { CopyIcon, ThumbsUpIcon, XIcon } from 'lucide-react';
import { Actions, Action } from '@/components/ai-elements/actions';
import {
  Artifact,
  ArtifactAction,
  ArtifactActions,
  ArtifactClose,
  ArtifactContent,
  ArtifactDescription,
  ArtifactHeader,
  ArtifactTitle,
} from '@/components/ai-elements/artifact';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { ChatMessage, ActionResult } from '../lib/types';
import { ActionLog } from './ActionLog';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSend: (message: string) => Promise<void>;
  isProcessing: boolean;
  actionLog: ActionResult[];
}

export function ChatPanel({ messages, onSend, isProcessing, actionLog }: ChatPanelProps) {
  const [draft, setDraft] = useState('');
  const [likedMessages, setLikedMessages] = useState<Set<string>>(() => new Set());
  const [isActionLogVisible, setIsActionLogVisible] = useState(true);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const handleToggleLike = (messageId: string) => {
    setLikedMessages((prev) => {
      const next = new Set(prev);
      if (next.has(messageId)) {
        next.delete(messageId);
      } else {
        next.add(messageId);
      }
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!draft.trim()) {
      return;
    }
    const message = draft.trim();
    setDraft('');
    await onSend(message);
  };

  const handleCopyActionLog = async () => {
    if (!actionLog.length || typeof navigator === 'undefined' || !navigator.clipboard) {
      setCopyStatus('error');
      return;
    }

    const formattedLog = actionLog
      .map((action) => {
        const header = `${action.type}${action.status ? ` [${action.status}]` : ''}`;
        const target = action.type === 'runCommand' ? action.command : action.path;
        const meta: string[] = [];
        if (action.type === 'runCommand' && action.cwd) {
          meta.push(`cwd: ${action.cwd}`);
        }
        if (action.message) {
          meta.push(action.message);
        }
        const body = action.output?.trim();
        return [header, target, meta.join('\n'), body].filter(Boolean).join('\n');
      })
      .join('\n\n');

    try {
      await navigator.clipboard.writeText(formattedLog);
      setCopyStatus('copied');
    } catch (error) {
      console.error('Failed to copy action log', error);
      setCopyStatus('error');
    }
  };

  useEffect(() => {
    if (copyStatus === 'idle') {
      return;
    }
    const timeout = window.setTimeout(() => setCopyStatus('idle'), 2000);
    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  const actionLogDescription = useMemo(() => {
    if (!actionLog.length) {
      return 'No actions executed yet.';
    }
    if (copyStatus === 'copied') {
      return 'Action log copied to clipboard.';
    }
    if (copyStatus === 'error') {
      return 'Unable to copy log. Try again or copy manually.';
    }
    return `Tracking ${Math.min(actionLog.length, 20)} recent ${actionLog.length === 1 ? 'action' : 'actions'}.`;
  }, [actionLog, copyStatus]);

  return (
    <div className="panel chat-panel">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3>Chatbot</h3>
        <div className="chat-messages">
          {messages.map((message) => {
            const isAssistant = message.role === 'assistant';
            const isLiked = likedMessages.has(message.id);

            return (
              <div key={message.id} className="chat-message">
                <div className="role">{isAssistant ? 'Assistant' : 'You'}</div>
                <div>{message.content}</div>
                {message.actions ? <ActionLog actions={message.actions} compact /> : null}
                {message.error ? (
                  <Alert variant="destructive" role="alert">
                    <AlertTitle>Assistant error</AlertTitle>
                    <AlertDescription>{message.error}</AlertDescription>
                  </Alert>
                ) : null}
                {isAssistant ? (
                  <Actions className="message-actions">
                    <Action
                      label={isLiked ? 'Remove like' : 'Like'}
                      aria-pressed={isLiked}
                      onClick={() => handleToggleLike(message.id)}
                    >
                      <ThumbsUpIcon aria-hidden="true" className="size-4" />
                    </Action>
                  </Actions>
                ) : null}
              </div>
            );
          })}
        </div>
        <form className="chat-input" onSubmit={handleSubmit}>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask for Next.js 15 + Tailwind + shadcn/ui scaffolds, dependencies, debugging help, or command execution"
          />
          <button type="submit" disabled={isProcessing}>
            {isProcessing ? 'Processing…' : 'Send'}
          </button>
        </form>
      </div>
      {isActionLogVisible ? (
        <Artifact className="side-action-log" aria-live="polite">
          <ArtifactHeader>
            <div>
              <ArtifactTitle>Latest actions</ArtifactTitle>
              <ArtifactDescription>{actionLogDescription}</ArtifactDescription>
            </div>
            <ArtifactActions>
              <ArtifactAction
                icon={CopyIcon}
                tooltip="Copy log"
                label="Copy action log"
                onClick={handleCopyActionLog}
                disabled={!actionLog.length}
              />
              <ArtifactClose aria-label="Hide action log" onClick={() => setIsActionLogVisible(false)}>
                <XIcon aria-hidden="true" className="size-4" />
              </ArtifactClose>
            </ArtifactActions>
          </ArtifactHeader>
          <ArtifactContent>
            <ActionLog actions={actionLog} emptyState="No actions executed yet." className="artifact-action-log" />
          </ArtifactContent>
        </Artifact>
      ) : (
        <div className="side-action-log-toggle">
          <Button variant="outline" size="sm" onClick={() => setIsActionLogVisible(true)}>
            Show actions
          </Button>
        </div>
      )}
    </div>
  );
}
