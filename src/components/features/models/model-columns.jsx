import { Badge } from '../../common/Badge';

export const modelColumns = [
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
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <span className="text-muted-foreground line-clamp-1">
        {row.getValue('description') || '—'}
      </span>
    ),
  },
  {
    accessorKey: 'max_tokens',
    header: 'Max Tokens',
    cell: ({ row }) => {
      const val = row.getValue('max_tokens');
      return <span className="text-muted-foreground">{val ? val.toLocaleString() : '—'}</span>;
    },
  },
  {
    accessorKey: 'cost_per_1k_input',
    header: 'Input Cost',
    cell: ({ row }) => {
      const val = row.getValue('cost_per_1k_input');
      return <span className="text-muted-foreground">${val != null ? val.toFixed(4) : '—'}</span>;
    },
  },
  {
    accessorKey: 'cost_per_1k_output',
    header: 'Output Cost',
    cell: ({ row }) => {
      const val = row.getValue('cost_per_1k_output');
      return <span className="text-muted-foreground">${val != null ? val.toFixed(4) : '—'}</span>;
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
