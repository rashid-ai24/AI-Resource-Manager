import { Badge } from '../../common/Badge';
import { AlertTriangle } from 'lucide-react';

export const apiKeyColumns = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 font-medium">
        <StatusDot active={row.original.is_active} />
        {row.getValue('name')}
      </div>
    ),
  },
  {
    accessorKey: 'provider_name',
    header: 'Provider',
    cell: ({ row }) => {
      const name = row.getValue('provider_name');
      return name ? (
        <Badge variant="outline">{name}</Badge>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: 'key_prefix',
    header: 'Prefix',
    cell: ({ row }) => (
      <span className="font-mono text-sm text-muted-foreground">
        {row.getValue('key_prefix') || '—'}
      </span>
    ),
  },
  {
    accessorKey: 'expires_at',
    header: 'Expires',
    cell: ({ row }) => {
      const expires = row.getValue('expires_at');
      if (!expires) return <span className="text-muted-foreground">—</span>;
      const date = new Date(expires);
      const now = new Date();
      const daysUntil = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
      const isExpired = daysUntil < 0;
      const isExpiringSoon = daysUntil >= 0 && daysUntil <= 30;
      return (
        <div className="flex items-center gap-1">
          {isExpiringSoon && !isExpired && (
            <AlertTriangle className="size-3 text-yellow-500" />
          )}
          <span className={`text-sm ${isExpired ? 'text-destructive' : isExpiringSoon ? 'text-yellow-500' : 'text-muted-foreground'}`}>
            {date.toLocaleDateString()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.getValue('is_active') ? 'success' : 'secondary'}>
        {row.getValue('is_active') ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'));
      return <span className="text-muted-foreground text-sm">{date.toLocaleDateString()}</span>;
    },
  },
];

function StatusDot({ active }) {
  return (
    <span
      className={`size-2 rounded-full shrink-0 ${
        active ? 'bg-emerald-500' : 'bg-muted-foreground/30'
      }`}
    />
  );
}
