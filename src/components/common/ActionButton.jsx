import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '../feedback/LoadingSpinner';

export const ActionButton = forwardRef(function ActionButton({
  icon: Icon,
  label,
  loading = false,
  disabled = false,
  variant = 'default',
  size = 'default',
  className,
  children,
  ...props
}, ref) {
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      disabled={disabled || loading}
      className={cn('gap-2', className)}
      {...props}
    >
      {loading ? (
        <LoadingSpinner size="xs" />
      ) : Icon ? (
        <Icon className="size-4" />
      ) : null}
      {label || children}
    </Button>
  );
});

export function ActionGroup({ children, className }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {children}
    </div>
  );
}

export default ActionButton;
