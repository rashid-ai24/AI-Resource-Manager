import { useCostOverTime, useCostByProvider, useCostByModel, useCostByProject } from '../../../hooks/use-analytics';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Skeleton } from '../../ui/skeleton';
import { DollarSign } from 'lucide-react';

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

function CostOverTimeChart({ timeRange }) {
  const { data, isLoading } = useCostOverTime(timeRange);

  if (isLoading) return <Skeleton className="h-[250px] w-full" />;
  if (!data || data.length === 0) {
    return (
      <div className="h-[250px] flex flex-col items-center justify-center text-muted-foreground">
        <DollarSign className="size-6 mb-2 opacity-50" />
        <p className="text-sm">No cost data</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="date" className="text-xs" tick={{ fill: 'currentColor' }} />
        <YAxis className="text-xs" tick={{ fill: 'currentColor' }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="cost" name="Cost ($)" stroke="#FF8042" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function CostByProviderChart({ timeRange }) {
  const { data, isLoading } = useCostByProvider(timeRange);

  if (isLoading) return <Skeleton className="h-[250px] w-full" />;
  if (!data || data.length === 0) {
    return (
      <div className="h-[250px] flex flex-col items-center justify-center text-muted-foreground">
        <p className="text-sm">No provider cost data</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={data} dataKey="cost" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

function CostByModelChart({ timeRange }) {
  const { data, isLoading } = useCostByModel(timeRange);

  if (isLoading) return <Skeleton className="h-[250px] w-full" />;
  if (!data || data.length === 0) {
    return (
      <div className="h-[250px] flex flex-col items-center justify-center text-muted-foreground">
        <p className="text-sm">No model cost data</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="name" className="text-xs" tick={{ fill: 'currentColor' }} />
        <YAxis className="text-xs" tick={{ fill: 'currentColor' }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="cost" name="Cost ($)" fill="#0088FE" />
      </BarChart>
    </ResponsiveContainer>
  );
}

function CostByProjectChart({ timeRange }) {
  const { data, isLoading } = useCostByProject(timeRange);

  if (isLoading) return <Skeleton className="h-[250px] w-full" />;
  if (!data || data.length === 0) {
    return (
      <div className="h-[250px] flex flex-col items-center justify-center text-muted-foreground">
        <p className="text-sm">No project cost data</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="name" className="text-xs" tick={{ fill: 'currentColor' }} />
        <YAxis className="text-xs" tick={{ fill: 'currentColor' }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="cost" name="Cost ($)" fill="#00C49F" />
      </BarChart>
    </ResponsiveContainer>
  );
}

function CostAnalysis({ timeRange = 30 }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold mb-4">Cost Over Time</h3>
        <CostOverTimeChart timeRange={timeRange} />
      </div>
      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold mb-4">Cost by Provider</h3>
        <CostByProviderChart timeRange={timeRange} />
      </div>
      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold mb-4">Cost by Model</h3>
        <CostByModelChart timeRange={timeRange} />
      </div>
      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold mb-4">Cost by Project</h3>
        <CostByProjectChart timeRange={timeRange} />
      </div>
    </div>
  );
}

export { CostAnalysis };
export default CostAnalysis;
