import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ipc } from '../lib/ipc';

export function useTags(filters) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['tags', filters],
    queryFn: () => ipc.tags.list(filters),
  });

  const create = useMutation({
    mutationFn: (data) => ipc.tags.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, ...data }) => ipc.tags.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });

  const remove = useMutation({
    mutationFn: (id) => ipc.tags.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
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

export function useTag(id) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['tags', id],
    queryFn: () => ipc.tags.get(id),
    enabled: !!id,
  });

  const update = useMutation({
    mutationFn: (data) => ipc.tags.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      queryClient.invalidateQueries({ queryKey: ['tags', id] });
    },
  });

  const remove = useMutation({
    mutationFn: () => ipc.tags.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
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

export function useTagEntities(tagId) {
  const queryClient = useQueryClient();

  const getByEntity = (entityType, entityId) => {
    return useQuery({
      queryKey: ['tags', 'entity', entityType, entityId],
      queryFn: () => ipc.tags.getByEntity(entityType, entityId),
      enabled: !!tagId,
    });
  };

  const addToEntity = useMutation({
    mutationFn: ({ entityType, entityId }) => ipc.tags.addToEntity(entityType, entityId, tagId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });

  const removeFromEntity = useMutation({
    mutationFn: ({ entityType, entityId }) => ipc.tags.removeFromEntity(entityType, entityId, tagId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });

  return { getByEntity, addToEntity, removeFromEntity };
}

export default useTags;
