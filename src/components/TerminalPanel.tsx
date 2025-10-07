import { Terminal } from './ai-elements';

interface TerminalPanelProps {
  output: string;
}

export function TerminalPanel({ output }: TerminalPanelProps) {
  return (
    <div className="panel">
      <h3>Terminal</h3>
      <Terminal output={output} />
    </div>
  );
}
