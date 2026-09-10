import { Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function RecentItems({ items = [], className, maxItems = 5 }) {
  const displayItems = items.slice(0, maxItems);

  if (displayItems.length === 0) return null;

  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-semibold text-muted-foreground">
        <Clock className="size-3" />
        <span>Recent</span>
      </div>
      <div className="space-y-0.5">
        {displayItems.map((item) => (
          <Link
            key={`${item.entityType}-${item.entityId}`}
            to={`/${item.entityType}/${item.entityId}`}
            className={cn(
              'flex items-center gap-2 px-2 py-1.5 rounded-md text-sm',
              'text-muted-foreground hover:text-foreground hover:bg-muted/50',
              'transition-colors group'
            )}
          >
            <span className="truncate flex-1">{item.name || item.title || 'Untitled'}</span>
            <ChevronRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecentItems;
