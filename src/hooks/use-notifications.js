import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ipc } from '../lib/ipc';

export function useNotifications(filters = {}) {
  return useQuery({
    queryKey: ['notifications', filters],
    queryFn: () => ipc.notifications.list(filters),
    staleTime: 1000 * 30,
  });
}

export function useUnreadNotifications() {
  return useQuery({
    queryKey: ['notifications', 'unread'],
    queryFn: () => ipc.notifications.getUnread(),
    staleTime: 1000 * 15,
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey: ['notifications', 'unreadCount'],
    queryFn: () => ipc.notifications.unreadCount(),
    staleTime: 1000 * 15,
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => ipc.notifications.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unreadCount'] });
    },
  });
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => ipc.notifications.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unreadCount'] });
    },
  });
}

export function useCreateNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => ipc.notifications.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unreadCount'] });
    },
  });
}

export function useCheckQuotaWarnings() {
  return useMutation({
    mutationFn: () => ipc.notifications.checkQuotas(),
  });
}

export default {
  useNotifications,
  useUnreadNotifications,
  useUnreadCount,
  useMarkAsRead,
  useMarkAllAsRead,
  useCreateNotification,
  useCheckQuotaWarnings,
};
