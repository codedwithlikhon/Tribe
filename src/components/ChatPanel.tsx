import { useCallback, useState } from 'react';
import type { ChatMessage, ActionResult } from '../lib/types';
import {
  Conversation,
  ConversationContent,
  Message,
  MessageContent,
  Response,
  PromptForm,
  PromptInput,
  CodeBlock,
} from './ai-elements';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSend: (message: string) => Promise<void>;
  isProcessing: boolean;
  actionLog: ActionResult[];
}

function truncateContent(content: string, limit = 800) {
  if (content.length <= limit) {
    return content;
  }
  return `${content.slice(0, limit)}\n… (truncated)`;
}

function ActionDetails({ action }: { action: ActionResult }) {
  const status = action.status ?? 'pending';
  const isCommand = action.type === 'runCommand';
  const descriptor = isCommand ? action.command : action.path;

  return (
    <div className="message-action-card">
      <div className="message-action-header">
        <span className="badge">{action.type}</span>
        <span className={`action-status action-status-${status}`}>{status}</span>
      </div>
      <code className="message-action-target">{descriptor}</code>
      {action.message ? <p className="message-action-message">{action.message}</p> : null}
      {isCommand ? (
        action.output ? (
          <CodeBlock language="bash" label="Command output">
            {action.output}
          </CodeBlock>
        ) : null
      ) : action.type === 'createOrUpdateFile' ? (
        <CodeBlock language="plaintext" label="Updated contents">
          {truncateContent(action.content)}
        </CodeBlock>
      ) : null}
    </div>
  );
}

export function ChatPanel({ messages, onSend, isProcessing, actionLog }: ChatPanelProps) {
  const [draft, setDraft] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      setSubmitError('Enter a prompt to continue.');
      return;
    }
    setSubmitError(null);
    setDraft('');
    try {
      await onSend(trimmed);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to send prompt.');
      setDraft(trimmed);
    }
  }, [draft, onSend]);

  return (
    <div className="panel chat-panel">
      <Conversation>
        <ConversationContent>
          {messages.length === 0 ? (
            <div className="chat-placeholder">Ask the assistant to scaffold a project or run a command.</div>
          ) : (
            messages.map((message) => (
              <Message key={message.id} from={message.role === 'assistant' ? 'assistant' : 'user'}>
                <MessageContent>
                  <Response>{message.content}</Response>
                  {message.error ? <div className="message-error">{message.error}</div> : null}
                  {message.actions && message.actions.length > 0 ? (
                    <div className="message-actions">
                      {message.actions.map((action, index) => (
                        <ActionDetails key={`${action.type}-${index}`} action={action} />
                      ))}
                    </div>
                  ) : null}
                </MessageContent>
              </Message>
            ))
          )}
        </ConversationContent>
        <PromptForm onSubmit={handleSubmit} isPending={isProcessing}>
          <PromptInput
            value={draft}
            onChange={(value) => {
              setDraft(value);
              if (submitError) {
                setSubmitError(null);
              }
            }}
            placeholder="Describe what you want to build, request file updates, or run commands"
            disabled={isProcessing}
          />
          {submitError ? <p className="prompt-error" role="alert">{submitError}</p> : null}
        </PromptForm>
      </Conversation>
      <aside className="chat-action-log" aria-live="polite">
        <h4>Latest actions</h4>
        {actionLog.length === 0 ? <p>No actions executed yet.</p> : null}
        <div className="chat-action-log-entries">
          {actionLog.map((action, index) => {
            const status = action.status ?? 'pending';
            const descriptor = action.type === 'runCommand' ? action.command : action.path;
            return (
              <div key={`${action.type}-${index}`} className="action-log-entry">
                <div className="action-log-header">
                  <span className="badge">{action.type}</span>
                  <span className={`action-status action-status-${status}`}>{status}</span>
                </div>
                <div className="action-log-body">{descriptor}</div>
                {action.message ? <div className="action-log-message">{action.message}</div> : null}
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
