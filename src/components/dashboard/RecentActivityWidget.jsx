import { useQuery } from '@tanstack/react-query';
import { Bot, Server, Key, FolderOpen, FileText, Clock } from 'lucide-react';
import { DashboardCard } from '../cards/DashboardCard';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { ipc } from '../../lib/ipc';

const entityIcons = {
  agent: Bot,
  provider: Server,
  api_key: Key,
  project: FolderOpen,
  note: FileText,
};

const actionColors = {
  created: 'text-emerald-500',
  updated: 'text-blue-500',
  deleted: 'text-red-500',
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
  const { data: activityData, isLoading } = useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: async () => {
      // In a real app, this would fetch from the API
      // For now, we'll return mock data
      return [
        { id: 1, type: 'agent', action: 'created', name: 'Customer Support Agent', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
        { id: 2, type: 'provider', action: 'updated', name: 'OpenAI', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
        { id: 3, type: 'api_key', action: 'created', name: 'Production API Key', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
        { id: 4, type: 'project', action: 'created', name: 'Website Redesign', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
        { id: 5, type: 'note', action: 'updated', name: 'Meeting Notes', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
      ];
    },
  });

  return (
    <DashboardCard
      title="Recent Activity"
      icon={Clock}
      footer={
        <Button variant="ghost" size="sm" className="w-full text-xs">
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
          {activityData?.map((activity) => {
            const Icon = entityIcons[activity.type] || Bot;
            const colorClass = actionColors[activity.action] || 'text-muted-foreground';

            return (
              <div key={activity.id} className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-muted">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {activity.name}
                  </p>
                  <p className={`text-xs ${colorClass}`}>
                    {activity.action}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatRelativeTime(activity.timestamp)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </DashboardCard>
  );
}

export { RecentActivityWidget };
export default RecentActivityWidget;
