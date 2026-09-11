import { Badge } from '../../common/Badge';

export const noteColumns = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div className="font-medium truncate max-w-[200px]">
        {row.getValue('title') || '—'}
      </div>
    ),
  },
  {
    accessorKey: 'content',
    header: 'Content',
    cell: ({ row }) => {
      const content = row.getValue('content');
      if (!content) return <span className="text-muted-foreground">—</span>;
      return (
        <span className="text-muted-foreground line-clamp-1 text-sm">
          {content.length > 100 ? content.substring(0, 100) + '...' : content}
        </span>
      );
    },
  },
  {
    accessorKey: 'agent_name',
    header: 'Agent',
    cell: ({ row }) => {
      const name = row.original.agent_name;
      return name ? (
        <Badge variant="outline">{name}</Badge>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: 'project_name',
    header: 'Project',
    cell: ({ row }) => {
      const name = row.original.project_name;
      return name ? (
        <Badge variant="outline">{name}</Badge>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated',
    cell: ({ row }) => {
      const date = new Date(row.getValue('updated_at'));
      return <span className="text-muted-foreground text-sm">{date.toLocaleDateString()}</span>;
    },
  },
];
