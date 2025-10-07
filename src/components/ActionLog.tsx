import type { ActionResult } from '../lib/types';

const STATUS_LABELS: Record<Exclude<ActionResult['status'], undefined>, string> = {
  pending: 'Pending',
  success: 'Success',
  error: 'Error',
};

const MAX_OUTPUT_LINES = 12;

function getTargetLabel(action: ActionResult): string {
  switch (action.type) {
    case 'runCommand':
      return action.command;
    default:
      return action.path;
  }
}

function formatOutput(output: string | undefined) {
  if (!output) return null;
  const trimmed = output.trim();
  if (!trimmed) return null;
  const lines = trimmed.split('\n');
  const truncated = lines.slice(-MAX_OUTPUT_LINES);
  const isTruncated = lines.length > truncated.length;
  const formatted = truncated.join('\n');
  return {
    formatted: isTruncated ? `…\n${formatted}` : formatted,
  };
}

interface ActionLogProps {
  actions: ActionResult[];
  heading?: string;
  emptyState?: string;
  compact?: boolean;
  className?: string;
}

export function ActionLog({ actions, heading, emptyState, compact = false, className }: ActionLogProps) {
  if (actions.length === 0 && !emptyState) {
    return null;
  }

  const containerClassNames = ['action-log'];
  if (compact) {
    containerClassNames.push('compact');
  }
  if (className) {
    containerClassNames.push(className);
  }

  return (
    <div className={containerClassNames.join(' ')}>
      {heading ? <h4>{heading}</h4> : null}
      {actions.length === 0 ? (
        <div className="action-log-empty">{emptyState}</div>
      ) : (
        actions.map((action, index) => {
          const keyBase = `${action.type}-${index}-${getTargetLabel(action)}`;
          const targetLabel = getTargetLabel(action);
          const statusLabel = action.status ? STATUS_LABELS[action.status] : null;
          const formattedOutput = action.type === 'runCommand' ? formatOutput(action.output) : null;

          return (
            <div key={keyBase} className="action-log-entry">
              <div className="action-log-header">
                <span className="badge">{action.type}</span>
                {statusLabel ? <span className={`status-badge status-${action.status}`}>{statusLabel}</span> : null}
              </div>
              <div className="action-target">{targetLabel}</div>
              {action.type === 'runCommand' && action.cwd ? <div className="action-meta">cwd: {action.cwd}</div> : null}
              {action.message ? <div className="action-meta">{action.message}</div> : null}
              {formattedOutput ? <pre className="action-output">{formattedOutput.formatted}</pre> : null}
            </div>
          );
        })
      )}
    </div>
  );
}
