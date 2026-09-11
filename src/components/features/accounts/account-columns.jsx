import { Badge } from '../../common/Badge';

export const accountColumns = [
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
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.getValue('email') || '—'}
      </span>
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
