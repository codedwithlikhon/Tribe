import type { ReactNode } from 'react';

interface ResponseProps {
  children: ReactNode;
}

export function Response({ children }: ResponseProps) {
  return <div className="response">{children}</div>;
}
