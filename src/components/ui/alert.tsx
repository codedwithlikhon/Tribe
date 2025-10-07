import { forwardRef, HTMLAttributes } from 'react';

export type AlertVariant = 'default' | 'destructive';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { className = '', variant = 'default', role = 'status', ...props },
  ref
) {
  const baseClass = 'alert';
  const variantClass = variant === 'destructive' ? 'alert-destructive' : '';
  const composedClassName = [baseClass, variantClass, className].filter(Boolean).join(' ').trim();

  return <div ref={ref} role={role} className={composedClassName} {...props} />;
});

export const AlertTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(function AlertTitle(
  { className = '', ...props },
  ref
) {
  return <h4 ref={ref} className={['alert-title', className].filter(Boolean).join(' ').trim()} {...props} />;
});

export const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(function AlertDescription(
  { className = '', ...props },
  ref
) {
  return <p ref={ref} className={['alert-description', className].filter(Boolean).join(' ').trim()} {...props} />;
});
