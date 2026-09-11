import { useQuery } from '@tanstack/react-query';
import { Bot, Server, Key, Activity } from 'lucide-react';
import { StatCard } from '../cards/StatCard';
import { DashboardCard } from '../cards/DashboardCard';
import { Skeleton } from '../ui/skeleton';
import { ipc } from '../../lib/ipc';

function StatsWidget() {
  const { data: agentsData, isLoading: agentsLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: () => ipc.agents.findAll(),
  });

  const { data: providersData, isLoading: providersLoading } = useQuery({
    queryKey: ['providers'],
    queryFn: () => ipc.providers.findAll(),
  });

  const { data: modelsData, isLoading: modelsLoading } = useQuery({
    queryKey: ['models'],
    queryFn: () => ipc.models.findAll(),
  });

  const { data: projectsData, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => ipc.projects.findAll(),
  });

  const isLoading = agentsLoading || providersLoading || modelsLoading || projectsLoading;

  const stats = [
    {
      title: 'Total Agents',
      value: agentsData?.success ? agentsData.data?.length || 0 : 0,
      icon: Bot,
      description: 'Active AI agents',
    },
    {
      title: 'Active Providers',
      value: providersData?.success ? providersData.data?.length || 0 : 0,
      icon: Server,
      description: 'Connected providers',
    },
    {
      title: 'Total Models',
      value: modelsData?.success ? modelsData.data?.length || 0 : 0,
      icon: Activity,
      description: 'Available models',
    },
    {
      title: 'Total Projects',
      value: projectsData?.success ? projectsData.data?.length || 0 : 0,
      icon: Key,
      description: 'Active projects',
    },
  ];

  return (
    <DashboardCard title="Overview" icon={Activity}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border bg-card p-5">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </div>
            ))}
          </>
        ) : (
          stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              description={stat.description}
            />
          ))
        )}
      </div>
    </DashboardCard>
  );
}

export { StatsWidget };
export default StatsWidget;
