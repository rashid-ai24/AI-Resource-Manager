import { cn } from '@/lib/utils';

export function MetricCard({
  label,
  value,
  unit,
  icon: Icon,
  color,
  className,
  valueClassName,
}) {
  return (
    <div className={cn(
      'flex items-center gap-3 p-4 rounded-xl bg-card border shadow-sm',
      className
    )}>
      {Icon && (
        <div className={cn(
          'p-2 rounded-lg shrink-0',
          color || 'bg-primary/10 text-primary'
        )}>
          <Icon className="size-4" />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground truncate">{label}</p>
        <div className="flex items-baseline gap-1">
          <p className={cn('text-lg font-bold tracking-tight', valueClassName)}>
            {value}
          </p>
          {unit && (
            <span className="text-xs text-muted-foreground">{unit}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MetricCard;
