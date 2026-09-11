import { Badge } from '../../common/Badge';
import { ExternalLink } from 'lucide-react';

export const providerColumns = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 font-medium">
        {row.original.is_active ? (
          <span className="size-2 rounded-full bg-emerald-500 shrink-0" />
        ) : (
          <span className="size-2 rounded-full bg-muted-foreground/30 shrink-0" />
        )}
        {row.getValue('name')}
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <span className="text-muted-foreground line-clamp-1">
        {row.getValue('description') || '—'}
      </span>
    ),
  },
  {
    accessorKey: 'base_url',
    header: 'Base URL',
    cell: ({ row }) => {
      const url = row.getValue('base_url');
      if (!url) return <span className="text-muted-foreground">—</span>;
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="truncate max-w-[200px]">{url}</span>
          <ExternalLink className="size-3 shrink-0" />
        </a>
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
