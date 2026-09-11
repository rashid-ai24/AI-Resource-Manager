import { Badge } from '../../common/Badge';
import { User } from 'lucide-react';

export function AccountCard({ account, onClick }) {
  return (
    <div
      onClick={() => onClick?.(account)}
      className="group rounded-lg border bg-card p-4 hover:bg-accent/50 cursor-pointer transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
            <User className="size-4 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
              {account.name}
            </h3>
            {account.email && (
              <p className="text-sm text-muted-foreground truncate mt-1">
                {account.email}
              </p>
            )}
          </div>
        </div>
        <Badge variant={account.is_active ? 'success' : 'secondary'}>
          {account.is_active ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      {account.provider_name && (
        <div className="mt-3">
          <Badge variant="outline" className="text-xs">
            {account.provider_name}
          </Badge>
        </div>
      )}
    </div>
  );
}

export default AccountCard;
