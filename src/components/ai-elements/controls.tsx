import type { ComponentProps } from 'react';
import { Controls as ReactFlowControls } from '@xyflow/react';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export type ControlsProps = ComponentProps<typeof ReactFlowControls> & {
  className?: string;
};

export function Controls({ className, showInteractive = false, ...props }: ControlsProps) {
  return (
    <ReactFlowControls
      className={cn('ai-controls', className)}
      showInteractive={showInteractive}
      {...props}
    />
  );
}

