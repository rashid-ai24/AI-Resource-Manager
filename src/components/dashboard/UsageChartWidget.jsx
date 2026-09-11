import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { DashboardCard } from '../cards/DashboardCard';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { ipc } from '../../lib/ipc';

const timeRanges = [
  { label: '7d', value: 7 },
  { label: '30d', value: 30 },
  { label: '90d', value: 90 },
  { label: '1y', value: 365 },
];

// Generate mock data for the chart
function generateMockData(days) {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      inputTokens: Math.floor(Math.random() * 10000) + 1000,
      outputTokens: Math.floor(Math.random() * 5000) + 500,
    });
  }
  
  return data;
}

function UsageChartWidget() {
  const [timeRange, setTimeRange] = useState(30);

  const { data: usageData, isLoading } = useQuery({
    queryKey: ['dashboard', 'usage', timeRange],
    queryFn: async () => {
      // In a real app, this would fetch from the API
      // For now, we'll use mock data
      return generateMockData(timeRange);
    },
  });

  return (
    <DashboardCard
      title="Token Usage"
      description="Usage over time"
      icon={BarChart3}
      headerAction={
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
    >
      {isLoading ? (
        <div className="h-[300px] flex items-center justify-center">
          <Skeleton className="h-full w-full" />
        </div>
      ) : (
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={usageData}>
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
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
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
      )}
    </DashboardCard>
  );
}

export { UsageChartWidget };
export default UsageChartWidget;
