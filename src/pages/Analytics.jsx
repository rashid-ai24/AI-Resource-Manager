import { useState } from 'react';
import { UsageTrends, CostAnalysis, ModelPerformance } from '../components/features/analytics';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/button';
import { BarChart3 } from 'lucide-react';

const timeRanges = [
  { label: '7d', value: 7 },
  { label: '30d', value: 30 },
  { label: '90d', value: 90 },
  { label: '1y', value: 365 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState(30);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Analytics"
        description="Usage trends, cost analysis, and model performance"
        icon={BarChart3}
        actions={
          <div className="flex gap-1">
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                variant={timeRange === range.value ? 'default' : 'ghost'}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setTimeRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        }
      />

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Usage Trends</h2>
          <div className="rounded-lg border bg-card p-4">
            <UsageTrends timeRange={timeRange} />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Cost Analysis</h2>
          <CostAnalysis timeRange={timeRange} />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Model Performance</h2>
          <div className="rounded-lg border bg-card p-4">
            <ModelPerformance timeRange={timeRange} />
          </div>
        </div>
      </div>
    </div>
  );
}
