import type { ReactNode } from 'react';

interface MessageProps {
  from: 'user' | 'assistant';
  children: ReactNode;
  status?: 'pending' | 'complete' | 'error';
}

export function Message({ from, children, status }: MessageProps) {
  const classes = ['message'];
  if (from === 'user') classes.push('message-user');
  if (from === 'assistant') classes.push('message-assistant');
  if (status === 'pending') classes.push('message-pending');
  if (status === 'error') classes.push('message-error');

  return (
    <article className={classes.join(' ')} aria-live={from === 'assistant' ? 'polite' : undefined}>
      <header className="message-header">
        <span className="message-author">{from === 'assistant' ? 'Assistant' : 'You'}</span>
        {status ? <span className={`message-status message-status-${status}`}>{status}</span> : null}
      </header>
      {children}
    </article>
  );
}

interface MessageContentProps {
  children: ReactNode;
}

export function MessageContent({ children }: MessageContentProps) {
  return <div className="message-content">{children}</div>;
}
