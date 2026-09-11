import { Badge } from '../../common/Badge';
import { Tag } from 'lucide-react';

export function TagCard({ tag, onClick }) {
  return (
    <div
      onClick={() => onClick?.(tag)}
      className="group rounded-lg border bg-card p-4 hover:bg-accent/50 cursor-pointer transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
            <Tag className="size-4 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
              {tag.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="size-2 rounded-full shrink-0"
                style={{ backgroundColor: tag.color || '#6B7280' }}
              />
              <span className="text-sm text-muted-foreground font-mono">{tag.color || '#6B7280'}</span>
            </div>
          </div>
        </div>
        <Badge variant="secondary">{new Date(tag.created_at).toLocaleDateString()}</Badge>
      </div>
    </div>
  );
}

export default TagCard;
