import { Badge } from '../../common/Badge';
import { ExternalLink } from 'lucide-react';

export function ProviderCard({ provider, onClick }) {
  return (
    <div
      onClick={() => onClick?.(provider)}
      className="group rounded-lg border bg-card p-4 hover:bg-accent/50 cursor-pointer transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`size-3 rounded-full shrink-0 ${
              provider.is_active ? 'bg-emerald-500' : 'bg-muted-foreground/30'
            }`}
          />
          <div className="min-w-0">
            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
              {provider.name}
            </h3>
            {provider.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {provider.description}
              </p>
            )}
          </div>
        </div>
        <Badge variant={provider.is_active ? 'success' : 'secondary'}>
          {provider.is_active ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      {provider.base_url && (
        <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
          <ExternalLink className="size-3 shrink-0" />
          <span className="truncate">{provider.base_url}</span>
        </div>
      )}
    </div>
  );
}

export default ProviderCard;
