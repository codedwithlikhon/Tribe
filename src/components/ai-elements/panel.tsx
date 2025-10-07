import type { ComponentProps } from 'react';
import { Panel as ReactFlowPanel } from '@xyflow/react';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export type PanelPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

const positionClassNames: Record<PanelPosition, string> = {
  'top-left': 'ai-panel-top-left',
  'top-center': 'ai-panel-top-center',
  'top-right': 'ai-panel-top-right',
  'bottom-left': 'ai-panel-bottom-left',
  'bottom-center': 'ai-panel-bottom-center',
  'bottom-right': 'ai-panel-bottom-right',
};

export interface PanelProps extends ComponentProps<typeof ReactFlowPanel> {
  position?: PanelPosition;
}

export function Panel({ position = 'top-left', className, children, ...props }: PanelProps) {
  return (
    <ReactFlowPanel
      position={position}
      className={cn('ai-panel', positionClassNames[position], className)}
      data-position={position}
      {...props}
    >
      {children}
    </ReactFlowPanel>
  );
}
