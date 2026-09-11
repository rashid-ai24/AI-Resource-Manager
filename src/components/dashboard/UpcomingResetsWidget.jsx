import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { DashboardCard } from '../cards/DashboardCard';
import { Skeleton } from '../ui/skeleton';
import { Progress } from '../ui/progress';

function UpcomingResetsWidget() {
  const { data: resetsData, isLoading } = useQuery({
    queryKey: ['dashboard', 'resets'],
    queryFn: async () => {
      // In a real app, this would fetch from the API
      // For now, we'll return mock data
      return [
        { id: 1, type: 'Daily Token Limit', entity: 'OpenAI', current: 75000, limit: 100000, resetDate: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString() },
        { id: 2, type: 'Monthly API Calls', entity: 'Anthropic', current: 450, limit: 500, resetDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString() },
        { id: 3, type: 'Daily Token Limit', entity: 'Google AI', current: 20000, limit: 100000, resetDate: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString() },
      ];
    },
  });

  function formatResetTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((date - now) / (1000 * 60 * 60));

    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  }

  function getUsagePercentage(current, limit) {
    return Math.round((current / limit) * 100);
  }

  function getProgressVariant(percentage) {
    if (percentage >= 80) return 'warning';
    return 'default';
  }

  return (
    <DashboardCard title="Upcoming Resets" icon={RefreshCw}>
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {resetsData?.map((reset) => {
            const percentage = getUsagePercentage(reset.current, reset.limit);
            const isWarning = percentage >= 80;

            return (
              <div key={reset.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isWarning ? (
                      <AlertTriangle className="size-4 text-yellow-500" />
                    ) : (
                      <Clock className="size-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">{reset.type}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Resets in {formatResetTime(reset.resetDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={percentage} 
                    className={`h-2 flex-1 ${isWarning ? 'bg-yellow-500/20' : ''}`}
                    indicatorClassName={isWarning ? 'bg-yellow-500' : ''}
                  />
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {reset.current.toLocaleString()} / {reset.limit.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardCard>
  );
}

export { UpcomingResetsWidget };
export default UpcomingResetsWidget;
