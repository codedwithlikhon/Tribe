interface TerminalProps {
  output: string;
  emptyPlaceholder?: string;
}

export function Terminal({ output, emptyPlaceholder = 'Terminal output will appear here.' }: TerminalProps) {
  return (
    <div className="terminal" role="log" aria-live="polite">
      <pre>{output ? output : emptyPlaceholder}</pre>
    </div>
  );
}
