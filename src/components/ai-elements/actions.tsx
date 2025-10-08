import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface ActionsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Actions({ className, children, ...props }: ActionsProps) {
  return (
    <div
      role="group"
      aria-label={props['aria-label'] ?? 'Message actions'}
      className={cn('actions-root', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface ActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function Action({ label, className, children, type = 'button', ...props }: ActionProps) {
  return (
    <button
      type={type}
      className={cn('action-button', className)}
      aria-label={props['aria-label'] ?? label}
      {...props}
    >
      {children}
      <span className="sr-only">{label}</span>
    </button>
  );
}
