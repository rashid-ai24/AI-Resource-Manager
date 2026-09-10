import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

const trendColors = {
  up: 'text-emerald-500',
  down: 'text-destructive',
  neutral: 'text-muted-foreground',
};

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
  iconClassName,
}) {
  const TrendIcon = trend ? trendIcons[trend] : null;

  return (
    <div className={cn(
      'rounded-xl border bg-card p-5 text-card-foreground shadow-sm',
      'transition-all hover:shadow-md',
      className
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 min-w-0">
          <p className="text-sm font-medium text-muted-foreground truncate">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            {TrendIcon && trendValue && (
              <span className={cn('flex items-center gap-0.5 text-xs font-medium', trendColors[trend])}>
                <TrendIcon className="size-3" />
                {trendValue}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
          )}
        </div>
        {Icon && (
          <div className={cn(
            'p-2.5 rounded-lg bg-primary/10 text-primary shrink-0',
            iconClassName
          )}>
            <Icon className="size-5" />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
