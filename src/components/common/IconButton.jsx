import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const IconButton = forwardRef(function IconButton({
  icon: Icon,
  label,
  size = 'icon',
  variant = 'ghost',
  className,
  tooltip,
  ...props
}, ref) {
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn('shrink-0', className)}
      aria-label={label || tooltip}
      title={tooltip}
      {...props}
    >
      <Icon className="size-4" />
    </Button>
  );
});

export default IconButton;
