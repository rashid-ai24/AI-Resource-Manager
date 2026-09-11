import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ipc } from '../lib/ipc';

export function useProviders(filters) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['providers', filters],
    queryFn: () => ipc.providers.list(filters),
  });

  const create = useMutation({
    mutationFn: (data) => ipc.providers.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['providers'] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, ...data }) => ipc.providers.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['providers'] });
    },
  });

  const remove = useMutation({
    mutationFn: (id) => ipc.providers.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['providers'] });
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

export function useProvider(id) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['providers', id],
    queryFn: () => ipc.providers.get(id),
    enabled: !!id,
  });

  const update = useMutation({
    mutationFn: (data) => ipc.providers.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['providers'] });
      queryClient.invalidateQueries({ queryKey: ['providers', id] });
    },
  });

  const remove = useMutation({
    mutationFn: () => ipc.providers.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['providers'] });
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
