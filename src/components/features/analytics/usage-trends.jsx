import { useUsageOverTime } from '../../../hooks/use-analytics';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Skeleton } from '../../ui/skeleton';
import { BarChart3 } from 'lucide-react';

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
};

function UsageTrends({ timeRange = 30 }) {
  const { data, isLoading } = useUsageOverTime(timeRange);

  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  const chartData = data || [];

  if (chartData.length === 0) {
    return (
      <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
        <BarChart3 className="size-8 mb-2 opacity-50" />
        <p className="text-sm">No usage data available</p>
      </div>
    );
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            className="text-xs"
            tick={{ fill: 'currentColor' }}
          />
          <YAxis
            className="text-xs"
            tick={{ fill: 'currentColor' }}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend />
          <Line
            type="monotone"
            dataKey="inputTokens"
            name="Input Tokens"
            stroke="hsl(210, 100%, 50%)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="outputTokens"
            name="Output Tokens"
            stroke="hsl(150, 100%, 50%)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export { UsageTrends };
export default UsageTrends;
