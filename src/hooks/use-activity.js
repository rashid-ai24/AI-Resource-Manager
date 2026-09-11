import { useQuery } from '@tanstack/react-query';
import { ipc } from '../lib/ipc';

export function useActivity(filters = {}) {
  return useQuery({
    queryKey: ['activity', filters],
    queryFn: () => ipc.activity.list(filters),
    staleTime: 1000 * 30,
  });
}

export function useRecentActivity(limit = 10) {
  return useQuery({
    queryKey: ['activity', 'recent', limit],
    queryFn: () => ipc.activity.getRecent(limit),
    staleTime: 1000 * 30,
  });
}

export function useActivityStats() {
  return useQuery({
    queryKey: ['activity', 'stats'],
    queryFn: () => ipc.activity.getStats(),
    staleTime: 1000 * 60,
  });
}

export function useEntityActivity(entityType, entityId) {
  return useQuery({
    queryKey: ['activity', 'entity', entityType, entityId],
    queryFn: () => ipc.activity.getByEntity(entityType, entityId),
    enabled: !!entityType && !!entityId,
    staleTime: 1000 * 30,
  });
}

export default {
  useActivity,
  useRecentActivity,
  useActivityStats,
  useEntityActivity,
};
