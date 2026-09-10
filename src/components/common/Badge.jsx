import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary border border-transparent',
        secondary: 'bg-secondary text-secondary-foreground border border-transparent',
        outline: 'text-foreground border',
        destructive: 'bg-destructive/10 text-destructive border border-transparent',
        success: 'bg-emerald-500/10 text-emerald-600 border border-transparent',
        warning: 'bg-amber-500/10 text-amber-600 border border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

const statusConfig = {
  active: { variant: 'success', label: 'Active' },
  inactive: { variant: 'secondary', label: 'Inactive' },
  archived: { variant: 'outline', label: 'Archived' },
  suspended: { variant: 'warning', label: 'Suspended' },
  trial: { variant: 'default', label: 'Trial' },
  expired: { variant: 'destructive', label: 'Expired' },
  pending: { variant: 'warning', label: 'Pending' },
  completed: { variant: 'success', label: 'Completed' },
};

export function StatusBadge({ status, className, ...props }) {
  const config = statusConfig[status] || { variant: 'secondary', label: status };

  return (
    <Badge variant={config.variant} className={className} {...props}>
      <span className={cn(
        'size-1.5 rounded-full mr-1.5',
        config.variant === 'success' && 'bg-emerald-500',
        config.variant === 'warning' && 'bg-amber-500',
        config.variant === 'destructive' && 'bg-destructive',
        config.variant === 'default' && 'bg-primary',
        config.variant === 'secondary' && 'bg-muted-foreground/50',
        config.variant === 'outline' && 'bg-muted-foreground/30',
      )} />
      {config.label}
    </Badge>
  );
}

export default Badge;
