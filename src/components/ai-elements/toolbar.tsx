import type { ComponentProps } from 'react';
import { NodeToolbar } from '@xyflow/react';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export type ToolbarProps = ComponentProps<typeof NodeToolbar>;

export function Toolbar({ className, position = 'bottom', ...props }: ToolbarProps) {
  return <NodeToolbar position={position} className={cn('ai-toolbar', className)} {...props} />;
}
