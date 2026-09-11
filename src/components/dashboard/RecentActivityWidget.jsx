import { useNavigate } from 'react-router-dom';
import { useRecentActivity } from '../../hooks/use-activity';
import { Bot, Server, Cpu, User, Key, FolderOpen, FileText, Tag, Clock } from 'lucide-react';
import { DashboardCard } from '../cards/DashboardCard';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { Badge } from '../common/Badge';

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

function RecentActivityWidget() {
  const navigate = useNavigate();
  const { data: activityData, isLoading } = useRecentActivity(5);

  return (
    <DashboardCard
      title="Recent Activity"
      icon={Clock}
      footer={
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs"
          onClick={() => navigate('/activity')}
        >
          View All Activity
        </Button>
      }
    >
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {(!activityData || activityData.length === 0) ? (
            <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
          ) : (
            activityData.map((activity) => {
              const Icon = entityIcons[activity.entity_type] || Bot;
              const action = actionConfig[activity.action] || { variant: 'secondary', label: activity.action };

              return (
                <div key={activity.id} className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-muted">
                    <Icon className="size-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {activity.entity_name || `Unknown ${activity.entity_type}`}
                    </p>
                    <Badge variant={action.variant} className="text-xs mt-0.5">
                      {action.label}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatRelativeTime(activity.created_at)}
                  </span>
                </div>
              );
            })
          )}
        </div>
      )}
    </DashboardCard>
  );
}

export { RecentActivityWidget };
export default RecentActivityWidget;
