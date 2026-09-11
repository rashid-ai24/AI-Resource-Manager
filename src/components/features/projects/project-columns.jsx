import { Badge } from '../../common/Badge';
import { FolderOpen } from 'lucide-react';

export const projectColumns = [
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
    accessorKey: 'path',
    header: 'Path',
    cell: ({ row }) => {
      const path = row.getValue('path');
      return path ? (
        <span className="text-muted-foreground font-mono text-xs truncate block max-w-[200px]">
          {path}
        </span>
      ) : (
        <span className="text-muted-foreground">—</span>
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
