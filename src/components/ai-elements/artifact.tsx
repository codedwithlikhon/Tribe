import type { ComponentProps, HTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

export function Artifact({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('artifact', className)} {...props} />;
}

export function ArtifactHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('artifact-header', className)} {...props} />;
}

export function ArtifactTitle({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('artifact-title', className)} {...props} />;
}

export function ArtifactDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('artifact-description', className)} {...props} />;
}

export function ArtifactActions({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('artifact-actions', className)} {...props} />;
}

export interface ArtifactActionProps extends ComponentProps<typeof Button> {
  tooltip?: string;
  label?: string;
  icon?: LucideIcon;
}

export function ArtifactAction({
  tooltip,
  label,
  icon: Icon,
  className,
  children,
  type = 'button',
  ...props
}: ArtifactActionProps) {
  const ariaLabel = props['aria-label'] ?? label ?? tooltip;
  const title = tooltip ?? label;

  return (
    <Button
      type={type}
      variant="ghost"
      size="icon"
      className={cn('artifact-action', className)}
      title={title}
      aria-label={ariaLabel}
      {...props}
    >
      {Icon ? <Icon aria-hidden="true" className="size-4" /> : null}
      {children}
      {label && !children ? <span className="sr-only">{label}</span> : null}
    </Button>
  );
}

export type ArtifactCloseProps = ComponentProps<typeof Button>;

export function ArtifactClose({ className, children, type = 'button', ...props }: ArtifactCloseProps) {
  const ariaLabel = props['aria-label'] ?? 'Dismiss artifact';

  return (
    <Button
      type={type}
      variant="ghost"
      size="icon"
      className={cn('artifact-close', className)}
      aria-label={ariaLabel}
      {...props}
    >
      {children ?? <span aria-hidden="true">×</span>}
    </Button>
  );
}

export function ArtifactContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('artifact-content', className)} {...props} />;
}
