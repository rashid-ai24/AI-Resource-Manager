import { useNavigate } from 'react-router-dom';
import { Badge } from '../../common/Badge';
import { Bot, Server, Cpu, User, Key, FolderOpen, FileText, Tag } from 'lucide-react';

const entityIcons = {
  agent: Bot,
  provider: Server,
  model: Cpu,
  account: User,
  api_key: Key,
  project: FolderOpen,
  note: FileText,
  tag: Tag,
};

const actionConfig = {
  created: { variant: 'success', label: 'Created' },
  updated: { variant: 'default', label: 'Updated' },
  deleted: { variant: 'destructive', label: 'Deleted' },
};

const entityRoutes = {
  agent: '/agents',
  provider: '/providers',
  model: '/models',
  account: '/accounts',
  api_key: '/api-keys',
  project: '/projects',
  note: '/notes',
  tag: '/tags',
};

function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

function ActivityItem({ activity }) {
  const navigate = useNavigate();
  const Icon = entityIcons[activity.entity_type] || Bot;
  const action = actionConfig[activity.action] || { variant: 'secondary', label: activity.action };
  const route = entityRoutes[activity.entity_type];

  const handleClick = () => {
    if (route && activity.entity_id) {
      navigate(`${route}/${activity.entity_id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
    >
      <div className="p-2 rounded-full bg-muted shrink-0">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">
          {activity.entity_name || `Unknown ${activity.entity_type}`}
        </p>
        <p className="text-xs text-muted-foreground">
          {activity.entity_type.replace('_', ' ')}
          {activity.details && ` — ${activity.details}`}
        </p>
      </div>
      <Badge variant={action.variant} className="text-xs shrink-0">
        {action.label}
      </Badge>
      <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
        {formatRelativeTime(activity.created_at)}
      </span>
    </div>
  );
}

export { ActivityItem };
export default ActivityItem;
