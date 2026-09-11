import { useUsageByModel } from '../../../hooks/use-analytics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Skeleton } from '../../ui/skeleton';
import { Cpu } from 'lucide-react';

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
};

function ModelPerformance({ timeRange = 30 }) {
  const { data, isLoading } = useUsageByModel(timeRange);

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
        <Cpu className="size-8 mb-2 opacity-50" />
        <p className="text-sm">No model performance data</p>
      </div>
    );
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs" tick={{ fill: 'currentColor' }} />
          <YAxis className="text-xs" tick={{ fill: 'currentColor' }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend />
          <Bar dataKey="inputTokens" name="Input Tokens" fill="hsl(210, 100%, 50%)" />
          <Bar dataKey="outputTokens" name="Output Tokens" fill="hsl(150, 100%, 50%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export { ModelPerformance };
export default ModelPerformance;
