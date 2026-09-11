import { Badge } from '../../common/Badge';
import { StatusBadge } from '../../common/Badge';

export const agentColumns = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 font-medium">
        <StatusBadge status={row.original.is_active ? 'active' : 'inactive'} />
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
    accessorKey: 'model_name',
    header: 'Model',
    cell: ({ row }) => {
      const name = row.getValue('model_name');
      return name ? (
        <Badge variant="outline">{name}</Badge>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: 'tag_names',
    header: 'Tags',
    cell: ({ row }) => {
      const tags = row.getValue('tag_names');
      if (!tags) return <span className="text-muted-foreground">—</span>;
      const tagList = tags.split(',');
      return (
        <div className="flex flex-wrap gap-1">
          {tagList.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {tag.trim()}
            </Badge>
          ))}
          {tagList.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{tagList.length - 3}
            </Badge>
          )}
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
