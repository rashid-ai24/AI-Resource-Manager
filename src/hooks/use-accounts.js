import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ipc } from '../lib/ipc';

export function useAccounts(filters) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['accounts', filters],
    queryFn: () => ipc.accounts.list(filters),
  });

  const create = useMutation({
    mutationFn: (data) => ipc.accounts.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, ...data }) => ipc.accounts.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  const remove = useMutation({
    mutationFn: (id) => ipc.accounts.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
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

export function useAccount(id) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['accounts', id],
    queryFn: () => ipc.accounts.get(id),
    enabled: !!id,
  });

  const update = useMutation({
    mutationFn: (data) => ipc.accounts.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['accounts', id] });
    },
  });

  const remove = useMutation({
    mutationFn: () => ipc.accounts.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
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
