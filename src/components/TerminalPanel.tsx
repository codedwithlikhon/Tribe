interface TerminalPanelProps {
  output: string;
}

export function TerminalPanel({ output }: TerminalPanelProps) {
  return (
    <div className="panel">
      <h3>Terminal</h3>
      <div className="terminal-output">{output || 'Terminal output will appear here.'}</div>
    </div>
  );
}
