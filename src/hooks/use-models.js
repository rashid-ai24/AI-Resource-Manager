import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ipc } from '../lib/ipc';

export function useModels(filters) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['models', filters],
    queryFn: () => ipc.models.list(filters),
  });

  const create = useMutation({
    mutationFn: (data) => ipc.models.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, ...data }) => ipc.models.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
    },
  });

  const remove = useMutation({
    mutationFn: (id) => ipc.models.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
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

export function useModel(id) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['models', id],
    queryFn: () => ipc.models.get(id),
    enabled: !!id,
  });

  const update = useMutation({
    mutationFn: (data) => ipc.models.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
      queryClient.invalidateQueries({ queryKey: ['models', id] });
    },
  });

  const remove = useMutation({
    mutationFn: () => ipc.models.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
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
