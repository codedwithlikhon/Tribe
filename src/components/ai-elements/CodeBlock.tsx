import type { ReactNode } from 'react';

interface CodeBlockProps {
  language?: string;
  children: ReactNode;
  label?: string;
}

export function CodeBlock({ language, children, label }: CodeBlockProps) {
  return (
    <div className="code-block" role="group" aria-label={label ?? language ?? 'Code block'}>
      {label ? <div className="code-block-label">{label}</div> : null}
      <pre>
        <code data-language={language}>{children}</code>
      </pre>
    </div>
  );
}
