import { cn } from '@/lib/utils';

export function EmptyCard({
  icon: Icon,
  title = 'No items',
  description,
  action,
  className,
}) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center p-8 rounded-xl border border-dashed bg-card/50 text-center',
      className
    )}>
      {Icon && (
        <div className="p-3 rounded-full bg-muted mb-4">
          <Icon className="size-6 text-muted-foreground" />
        </div>
      )}
      <h3 className="font-medium text-foreground">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>
      )}
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyCard;
