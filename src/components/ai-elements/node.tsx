import type { ComponentProps } from 'react';
import { Handle, Position } from '@xyflow/react';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export interface NodeProps extends ComponentProps<'div'> {
  handles: {
    target: boolean;
    source: boolean;
  };
}

export function Node({ handles, className, children, ...props }: NodeProps) {
  return (
    <div className={cn('ai-node', className)} {...props}>
      {handles.target ? (
        <Handle
          type="target"
          position={Position.Left}
          className="ai-node__handle ai-node__handle--target"
        />
      ) : null}
      {handles.source ? (
        <Handle
          type="source"
          position={Position.Right}
          className="ai-node__handle ai-node__handle--source"
        />
      ) : null}
      {children}
    </div>
  );
}

type DivProps = ComponentProps<'div'>;

type HeadingProps = ComponentProps<'h3'>;

type ParagraphProps = ComponentProps<'p'>;

export function NodeHeader({ className, ...props }: DivProps) {
  return <div className={cn('ai-node__header', className)} {...props} />;
}

export function NodeTitle({ className, ...props }: HeadingProps) {
  return <h3 className={cn('ai-node__title', className)} {...props} />;
}

export function NodeDescription({ className, ...props }: ParagraphProps) {
  return <p className={cn('ai-node__description', className)} {...props} />;
}

export function NodeAction({ className, ...props }: DivProps) {
  return <div className={cn('ai-node__action', className)} {...props} />;
}

export function NodeContent({ className, ...props }: DivProps) {
  return <div className={cn('ai-node__content', className)} {...props} />;
}

export function NodeFooter({ className, ...props }: DivProps) {
  return <div className={cn('ai-node__footer', className)} {...props} />;
}

