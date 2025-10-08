import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

const variantClassNames = {
  default: 'ui-button-default',
  ghost: 'ui-button-ghost',
  outline: 'ui-button-outline',
};

const sizeClassNames = {
  default: 'ui-button-size-default',
  sm: 'ui-button-size-sm',
  icon: 'ui-button-size-icon',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantClassNames;
  size?: keyof typeof sizeClassNames;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', type = 'button', ...props }, ref) => {
    return (
      <button
        type={type}
        className={cn('ui-button', variantClassNames[variant], sizeClassNames[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
