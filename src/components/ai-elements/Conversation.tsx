import type { ReactNode } from 'react';

interface ConversationProps {
  children: ReactNode;
}

export function Conversation({ children }: ConversationProps) {
  return <section className="conversation">{children}</section>;
}

interface ConversationContentProps {
  children: ReactNode;
}

export function ConversationContent({ children }: ConversationContentProps) {
  return <div className="conversation-content">{children}</div>;
}
