import { useUpcomingResets } from '../../hooks/use-quotas';
import { AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { DashboardCard } from '../cards/DashboardCard';
import { Skeleton } from '../ui/skeleton';
import { Progress } from '../ui/progress';

function UpcomingResetsWidget() {
  const { data: resetsData, isLoading } = useUpcomingResets(5);

  function formatResetTime(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((date - now) / (1000 * 60 * 60));

    if (diffInHours < 0) return 'Overdue';
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  }

  function getUsagePercentage(current, limit) {
    if (limit === 0) return 0;
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
      ) : !resetsData || resetsData.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground text-sm">
          No upcoming resets
        </div>
      ) : (
        <div className="space-y-4">
          {resetsData.map((reset) => {
            const percentage = getUsagePercentage(reset.used_value, reset.limit_value);
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
                    <span className="text-sm font-medium">{reset.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Resets in {formatResetTime(reset.next_reset_at)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress
                    value={percentage}
                    className={`h-2 flex-1 ${isWarning ? 'bg-yellow-500/20' : ''}`}
                    indicatorClassName={isWarning ? 'bg-yellow-500' : ''}
                  />
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {reset.used_value.toLocaleString()} / {reset.limit_value.toLocaleString()}
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
