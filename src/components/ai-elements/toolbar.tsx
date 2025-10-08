import type { ComponentProps } from 'react';
import { NodeToolbar } from '@xyflow/react';
import { cn } from '@/utils/cn';

export type ToolbarProps = ComponentProps<typeof NodeToolbar>;

export function Toolbar({ className, position = 'bottom', ...props }: ToolbarProps) {
  return <NodeToolbar position={position} className={cn('ai-toolbar', className)} {...props} />;
}
