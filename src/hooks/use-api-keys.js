import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ipc } from '../lib/ipc';

export function useApiKeys(filters) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['apiKeys', filters],
    queryFn: () => ipc.apiKeys.list(filters),
  });

  const create = useMutation({
    mutationFn: (data) => ipc.apiKeys.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, ...data }) => ipc.apiKeys.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
    },
  });

  const remove = useMutation({
    mutationFn: (id) => ipc.apiKeys.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    create,
    update,
    remove,
  };
}

export function useApiKey(id) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['apiKeys', id],
    queryFn: () => ipc.apiKeys.get(id),
    enabled: !!id,
  });

  const update = useMutation({
    mutationFn: (data) => ipc.apiKeys.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
      queryClient.invalidateQueries({ queryKey: ['apiKeys', id] });
    },
  });

  const remove = useMutation({
    mutationFn: () => ipc.apiKeys.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    update,
    remove,
  };
}
