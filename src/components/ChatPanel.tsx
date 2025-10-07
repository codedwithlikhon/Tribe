import { FormEvent, useState } from 'react';
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!draft.trim()) {
      return;
    }
    const message = draft.trim();
    setDraft('');
    await onSend(message);
  };

  return (
    <div className="panel chat-panel">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3>Chatbot</h3>
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className="chat-message">
              <div className="role">{message.role === 'assistant' ? 'Assistant' : 'You'}</div>
              <div>{message.content}</div>
              {message.actions ? <ActionLog actions={message.actions} compact /> : null}
              {message.error ? <div className="action-log-entry">Error: {message.error}</div> : null}
            </div>
          ))}
        </div>
        <form className="chat-input" onSubmit={handleSubmit}>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask for scaffolding, dependencies, debugging help, or command execution"
          />
          <button type="submit" disabled={isProcessing}>
            {isProcessing ? 'Processing…' : 'Send'}
          </button>
        </form>
      </div>
      <ActionLog
        actions={actionLog}
        heading="Latest actions"
        emptyState="No actions executed yet."
        className="side-action-log"
      />
    </div>
  );
}
