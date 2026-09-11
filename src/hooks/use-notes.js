import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ipc } from '../lib/ipc';

export function useNotes(filters) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['notes', filters],
    queryFn: () => ipc.notes.list(filters),
  });

  const create = useMutation({
    mutationFn: (data) => ipc.notes.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, ...data }) => ipc.notes.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const remove = useMutation({
    mutationFn: (id) => ipc.notes.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
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

export function useNote(id) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['notes', id],
    queryFn: () => ipc.notes.get(id),
    enabled: !!id,
  });

  const update = useMutation({
    mutationFn: (data) => ipc.notes.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['notes', id] });
    },
  });

  const remove = useMutation({
    mutationFn: () => ipc.notes.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
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

export default useNotes;
