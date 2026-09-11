import { cn } from '@/lib/utils';
import { MoreHorizontal } from 'lucide-react';

export function DashboardCard({
  title,
  description,
  icon: Icon,
  headerAction,
  children,
  className,
  contentClassName,
  footer,
  compact = false,
  interactive = false,
}) {
  return (
    <div className={cn(
      'rounded-xl border bg-card text-card-foreground shadow-sm',
      interactive && 'transition-shadow hover:shadow-md cursor-pointer',
      className
    )}>
      <div className={cn(
        'flex items-center justify-between gap-2',
        compact ? 'px-4 py-3' : 'px-5 py-4'
      )}>
        <div className="flex items-center gap-2 min-w-0">
          {Icon && <Icon className="size-4 text-muted-foreground shrink-0" />}
          <div className="min-w-0">
            <h3 className={cn(
              'font-semibold truncate',
              compact ? 'text-sm' : 'text-base'
            )}>
              {title}
            </h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{description}</p>
            )}
          </div>
        </div>
        {headerAction}
      </div>

      <div className={cn(
        compact ? 'px-4 pb-3' : 'px-5 pb-4',
        contentClassName
      )}>
        {children}
      </div>

      {footer && (
        <div className={cn(
          'border-t bg-muted/30',
          compact ? 'px-4 py-2' : 'px-5 py-3'
        )}>
          {footer}
        </div>
      )}
    </div>
  );
}

export function DashboardCardMenu({ onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors',
        className
      )}
      aria-label="More options"
    >
      <MoreHorizontal className="size-4" />
    </button>
  );
}

export default DashboardCard;
