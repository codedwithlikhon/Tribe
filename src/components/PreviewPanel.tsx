interface PreviewPanelProps {
  url: string | null;
}

export function PreviewPanel({ url }: PreviewPanelProps) {
  return (
    <div className="panel">
      <h3>Live preview</h3>
      {url ? (
        <iframe src={url} className="preview-frame" title="WebContainer preview" />
      ) : (
        <p>Start a dev server (for example `npm run dev -- --host`) to see the preview.</p>
      )}
    </div>
  );
}
