import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ipc } from '../lib/ipc';

export function useQuotas(filters = {}) {
  return useQuery({
    queryKey: ['quotas', filters],
    queryFn: () => ipc.quotas.list(filters),
    staleTime: 1000 * 30,
  });
}

export function useQuota(id) {
  return useQuery({
    queryKey: ['quotas', id],
    queryFn: () => ipc.quotas.get(id),
    enabled: !!id,
    staleTime: 1000 * 30,
  });
}

export function useActiveQuotas() {
  return useQuery({
    queryKey: ['quotas', 'active'],
    queryFn: () => ipc.quotas.active(),
    staleTime: 1000 * 30,
  });
}

export function useUpcomingResets(limit = 10) {
  return useQuery({
    queryKey: ['quotas', 'upcomingResets', limit],
    queryFn: () => ipc.quotas.upcomingResets(limit),
    staleTime: 1000 * 30,
  });
}

export function useCreateQuota() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => ipc.quotas.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotas'] });
      queryClient.invalidateQueries({ queryKey: ['quotas', 'active'] });
      queryClient.invalidateQueries({ queryKey: ['quotas', 'upcomingResets'] });
    },
  });
}

export function useUpdateQuota() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => ipc.quotas.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotas'] });
      queryClient.invalidateQueries({ queryKey: ['quotas', 'active'] });
      queryClient.invalidateQueries({ queryKey: ['quotas', 'upcomingResets'] });
    },
  });
}

export function useDeleteQuota() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => ipc.quotas.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotas'] });
      queryClient.invalidateQueries({ queryKey: ['quotas', 'active'] });
      queryClient.invalidateQueries({ queryKey: ['quotas', 'upcomingResets'] });
    },
  });
}

export function useIncrementQuotaUsage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, amount = 1 }) => ipc.quotas.incrementUsage(id, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotas'] });
      queryClient.invalidateQueries({ queryKey: ['quotas', 'active'] });
    },
  });
}

export function useResetQuotaUsage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => ipc.quotas.resetUsage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotas'] });
      queryClient.invalidateQueries({ queryKey: ['quotas', 'active'] });
    },
  });
}

export default {
  useQuotas,
  useQuota,
  useActiveQuotas,
  useUpcomingResets,
  useCreateQuota,
  useUpdateQuota,
  useDeleteQuota,
  useIncrementQuotaUsage,
  useResetQuotaUsage,
};
