import { Badge } from '../../common/Badge';
import { Key, AlertTriangle } from 'lucide-react';

export function ApiKeyCard({ apiKey, onClick }) {
  const isExpiringSoon = apiKey.expires_at && (() => {
    const days = Math.ceil((new Date(apiKey.expires_at) - new Date()) / (1000 * 60 * 60 * 24));
    return days >= 0 && days <= 30;
  })();

  const isExpired = apiKey.expires_at && new Date(apiKey.expires_at) < new Date();

  return (
    <div
      onClick={() => onClick?.(apiKey)}
      className="group rounded-lg border bg-card p-4 hover:bg-accent/50 cursor-pointer transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
            <Key className="size-4 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
              {apiKey.name}
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              {apiKey.key_prefix || '—'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isExpiringSoon && !isExpired && (
            <AlertTriangle className="size-4 text-yellow-500" />
          )}
          <Badge variant={apiKey.is_active ? 'success' : 'secondary'}>
            {apiKey.is_active ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
        {apiKey.provider_name && (
          <Badge variant="outline" className="text-xs">
            {apiKey.provider_name}
          </Badge>
        )}
        {apiKey.account_name && (
          <span>{apiKey.account_name}</span>
        )}
        {apiKey.expires_at && (
          <span className={isExpired ? 'text-destructive' : isExpiringSoon ? 'text-yellow-500' : ''}>
            Expires: {new Date(apiKey.expires_at).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}

export default ApiKeyCard;
