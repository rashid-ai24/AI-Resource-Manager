import { cn } from '@/lib/utils';

export function EmptyState({
  icon: Icon,
  title = 'No items found',
  description,
  action,
  className,
  children,
}) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-12 px-4 text-center',
      className
    )}>
      {Icon && (
        <div className="p-4 rounded-full bg-muted mb-4">
          <Icon className="size-8 text-muted-foreground" />
        </div>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">{description}</p>
      )}
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export default EmptyState;
