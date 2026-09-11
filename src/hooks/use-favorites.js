import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ipc } from '../lib/ipc';

export function useFavorites(filters = {}) {
  return useQuery({
    queryKey: ['favorites', filters],
    queryFn: () => ipc.favorites.list(filters),
    staleTime: 1000 * 30,
  });
}

export function useFavorite(id) {
  return useQuery({
    queryKey: ['favorites', id],
    queryFn: () => ipc.favorites.get(id),
    enabled: !!id,
    staleTime: 1000 * 30,
  });
}

export function useFavoritesByType(entityType) {
  return useQuery({
    queryKey: ['favorites', 'byType', entityType],
    queryFn: () => ipc.favorites.findByType(entityType),
    enabled: !!entityType,
    staleTime: 1000 * 30,
  });
}

export function useIsFavorited(entityType, entityId) {
  return useQuery({
    queryKey: ['favorites', 'isFavorited', entityType, entityId],
    queryFn: () => ipc.favorites.isFavorited(entityType, entityId),
    enabled: !!entityType && !!entityId,
    staleTime: 1000 * 30,
  });
}

export function useFavoriteCount(entityType) {
  return useQuery({
    queryKey: ['favorites', 'count', entityType],
    queryFn: () => ipc.favorites.count(entityType),
    staleTime: 1000 * 30,
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ entityType, entityId, entityName = '', notes = '' }) =>
      ipc.favorites.toggle(entityType, entityId, entityName, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
}

export function useDeleteFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => ipc.favorites.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
}

export default {
  useFavorites,
  useFavorite,
  useFavoritesByType,
  useIsFavorited,
  useFavoriteCount,
  useToggleFavorite,
  useDeleteFavorite,
};
