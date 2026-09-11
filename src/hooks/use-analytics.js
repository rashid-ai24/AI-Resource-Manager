import { useQuery } from '@tanstack/react-query';
import { ipc } from '../lib/ipc';

export function useUsageOverTime(timeRange = 30, filters = {}) {
  return useQuery({
    queryKey: ['analytics', 'usage', timeRange, filters],
    queryFn: () => ipc.analytics.usageOverTime(timeRange, filters),
    staleTime: 1000 * 60,
  });
}

export function useCostOverTime(timeRange = 30, filters = {}) {
  return useQuery({
    queryKey: ['analytics', 'cost', timeRange, filters],
    queryFn: () => ipc.analytics.costOverTime(timeRange, filters),
    staleTime: 1000 * 60,
  });
}

export function useCostByProvider(timeRange = 30) {
  return useQuery({
    queryKey: ['analytics', 'costByProvider', timeRange],
    queryFn: () => ipc.analytics.costByProvider(timeRange),
    staleTime: 1000 * 60,
  });
}

export function useCostByModel(timeRange = 30) {
  return useQuery({
    queryKey: ['analytics', 'costByModel', timeRange],
    queryFn: () => ipc.analytics.costByModel(timeRange),
    staleTime: 1000 * 60,
  });
}

export function useCostByProject(timeRange = 30) {
  return useQuery({
    queryKey: ['analytics', 'costByProject', timeRange],
    queryFn: () => ipc.analytics.costByProject(timeRange),
    staleTime: 1000 * 60,
  });
}

export function useUsageByModel(timeRange = 30) {
  return useQuery({
    queryKey: ['analytics', 'usageByModel', timeRange],
    queryFn: () => ipc.analytics.usageByModel(timeRange),
    staleTime: 1000 * 60,
  });
}

export function useTokenDistribution(timeRange = 30) {
  return useQuery({
    queryKey: ['analytics', 'tokenDistribution', timeRange],
    queryFn: () => ipc.analytics.tokenDistribution(timeRange),
    staleTime: 1000 * 60,
  });
}

export default {
  useUsageOverTime,
  useCostOverTime,
  useCostByProvider,
  useCostByModel,
  useCostByProject,
  useUsageByModel,
  useTokenDistribution,
};
