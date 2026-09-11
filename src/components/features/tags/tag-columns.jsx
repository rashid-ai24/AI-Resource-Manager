import { Badge } from '../../common/Badge';

export const tagColumns = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 font-medium">
        <span
          className="size-3 rounded-full shrink-0"
          style={{ backgroundColor: row.original.color || '#6B7280' }}
        />
        {row.getValue('name')}
      </div>
    ),
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => {
      const color = row.getValue('color');
      return (
        <div className="flex items-center gap-2">
          <span
            className="size-4 rounded border"
            style={{ backgroundColor: color || '#6B7280' }}
          />
          <span className="text-sm text-muted-foreground font-mono">{color || '#6B7280'}</span>
        </div>
      );
    },
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
