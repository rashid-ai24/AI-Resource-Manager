import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function EntityCard({
  title,
  description,
  icon: Icon,
  to,
  badge,
  metadata,
  actions,
  className,
  onClick,
}) {
  const content = (
    <div className={cn(
      'group rounded-xl border bg-card p-4 text-card-foreground shadow-sm',
      'transition-all hover:shadow-md',
      to && 'cursor-pointer hover:border-primary/50',
      className
    )}>
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
            <Icon className="size-5" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                {title}
              </h3>
              {description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {description}
                </p>
              )}
            </div>
            {badge}
          </div>

          {metadata && (
            <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
              {metadata}
            </div>
          )}

          {actions && (
            <div className="flex items-center gap-2 mt-3">
              {actions}
            </div>
          )}
        </div>

        {to && (
          <ChevronRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl">
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl">
        {content}
      </button>
    );
  }

  return content;
}

export default EntityCard;
