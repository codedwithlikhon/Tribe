import type { ComponentProps } from 'react';
import { Controls as ReactFlowControls } from '@xyflow/react';
import { cn } from '@/utils/cn';

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

