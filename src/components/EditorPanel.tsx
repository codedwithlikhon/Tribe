interface EditorPanelProps {
  path: string | null;
  content: string;
  onChange: (content: string) => void;
  onSave: () => void;
  isSaving: boolean;
}

export function EditorPanel({ path, content, onChange, onSave, isSaving }: EditorPanelProps) {
  if (!path) {
    return (
      <div className="panel editor">
        <h3>Editor</h3>
        <p>Select a file to view or edit its contents.</p>
      </div>
    );
  }

  return (
    <div className="panel editor">
      <div className="status-bar">
        Editing <strong>{path}</strong>
      </div>
      <textarea value={content} onChange={(event) => onChange(event.target.value)} spellCheck={false} />
      <div className="chat-input" style={{ justifyContent: 'flex-end', marginTop: '0.75rem' }}>
        <button onClick={onSave} disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  );
}
