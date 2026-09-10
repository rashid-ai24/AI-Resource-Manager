import { cn } from '@/lib/utils';
import Breadcrumbs from './Breadcrumbs';

export function PageHeader({
  title,
  description,
  icon: Icon,
  breadcrumbs,
  actions,
  children,
  className,
  compact = false,
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} />
      )}

      <div className={cn(
        'flex items-start justify-between gap-4',
        compact ? 'items-center' : 'items-start'
      )}>
        <div className="flex items-start gap-3 min-w-0">
          {Icon && (
            <div className="mt-0.5 p-2 rounded-lg bg-primary/10 text-primary shrink-0">
              <Icon className={cn(compact ? 'size-4' : 'size-5')} />
            </div>
          )}
          <div className="min-w-0">
            <h1 className={cn(
              'font-semibold tracking-tight',
              compact ? 'text-lg' : 'text-2xl'
            )}>
              {title}
            </h1>
            {description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex items-center gap-2 shrink-0">
            {actions}
          </div>
        )}
      </div>

      {children}
    </div>
  );
}

export default PageHeader;
