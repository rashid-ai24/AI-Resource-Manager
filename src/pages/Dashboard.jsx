import { StatsWidget } from '../components/dashboard/StatsWidget';
import { QuickActionsWidget } from '../components/dashboard/QuickActionsWidget';
import { UsageChartWidget } from '../components/dashboard/UsageChartWidget';
import { RecentActivityWidget } from '../components/dashboard/RecentActivityWidget';
import { UpcomingResetsWidget } from '../components/dashboard/UpcomingResetsWidget';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">AI Resource Manager Overview</p>
      </div>

      <StatsWidget />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UsageChartWidget />
        </div>
        <div>
          <RecentActivityWidget />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActionsWidget />
        <UpcomingResetsWidget />
      </div>
    </div>
  );
}
