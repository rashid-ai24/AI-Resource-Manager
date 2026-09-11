import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ipc } from '../lib/ipc';

export function useProjects(filters) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['projects', filters],
    queryFn: () => ipc.projects.list(filters),
  });

  const create = useMutation({
    mutationFn: (data) => ipc.projects.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, ...data }) => ipc.projects.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const remove = useMutation({
    mutationFn: (id) => ipc.projects.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
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

export function useProject(id) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['projects', id],
    queryFn: () => ipc.projects.get(id),
    enabled: !!id,
  });

  const update = useMutation({
    mutationFn: (data) => ipc.projects.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects', id] });
    },
  });

  const remove = useMutation({
    mutationFn: () => ipc.projects.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
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
