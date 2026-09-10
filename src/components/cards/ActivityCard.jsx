import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const actionColors = {
  created: 'bg-emerald-500',
  updated: 'bg-blue-500',
  deleted: 'bg-destructive',
  viewed: 'bg-muted-foreground',
};

export function ActivityCard({
  action,
  entityName,
  entityType,
  details,
  timestamp,
  icon: Icon,
  className,
}) {
  const dotColor = actionColors[action] || 'bg-muted-foreground';

  return (
    <div className={cn('flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors', className)}>
      <div className="relative mt-1">
        <div className={cn('size-2 rounded-full', dotColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-medium">{entityName}</span>
          <span className="text-muted-foreground"> {action} </span>
          {entityType && (
            <span className="text-muted-foreground">{entityType}</span>
          )}
        </p>
        {details && (
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{details}</p>
        )}
        {timestamp && (
          <p className="text-xs text-muted-foreground/70 mt-1">
            {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
          </p>
        )}
      </div>
      {Icon && (
        <Icon className="size-4 text-muted-foreground shrink-0 mt-0.5" />
      )}
    </div>
  );
}

export function ActivityList({ items = [], className }) {
  if (items.length === 0) return null;

  return (
    <div className={cn('space-y-1', className)}>
      {items.map((item, index) => (
        <ActivityCard key={item.id || index} {...item} />
      ))}
    </div>
  );
}

export default ActivityCard;
