import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ipc } from '../lib/ipc';

export function useAgents(filters) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['agents', filters],
    queryFn: () => ipc.agents.list(filters),
  });

  const create = useMutation({
    mutationFn: (data) => ipc.agents.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, ...data }) => ipc.agents.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });

  const remove = useMutation({
    mutationFn: (id) => ipc.agents.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
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

export function useAgent(id) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['agents', id],
    queryFn: () => ipc.agents.get(id),
    enabled: !!id,
  });

  const update = useMutation({
    mutationFn: (data) => ipc.agents.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      queryClient.invalidateQueries({ queryKey: ['agents', id] });
    },
  });

  const remove = useMutation({
    mutationFn: () => ipc.agents.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
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
