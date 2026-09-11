import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ipc } from '../lib/ipc';

export function useTemplates(filters = {}) {
  return useQuery({
    queryKey: ['templates', filters],
    queryFn: () => ipc.templates.list(filters),
    staleTime: 1000 * 30,
  });
}

export function useTemplate(id) {
  return useQuery({
    queryKey: ['templates', id],
    queryFn: () => ipc.templates.get(id),
    enabled: !!id,
    staleTime: 1000 * 30,
  });
}

export function useTemplateConfig(id) {
  return useQuery({
    queryKey: ['templates', id, 'config'],
    queryFn: () => ipc.templates.getConfig(id),
    enabled: !!id,
    staleTime: 1000 * 30,
  });
}

export function useTemplatesByType(templateType) {
  return useQuery({
    queryKey: ['templates', 'byType', templateType],
    queryFn: () => ipc.templates.findByType(templateType),
    enabled: !!templateType,
    staleTime: 1000 * 30,
  });
}

export function useCreateTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => ipc.templates.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });
}

export function useUpdateTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => ipc.templates.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });
}

export function useDeleteTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => ipc.templates.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });
}

export function useDuplicateTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => ipc.templates.duplicate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });
}

export default {
  useTemplates,
  useTemplate,
  useTemplateConfig,
  useTemplatesByType,
  useCreateTemplate,
  useUpdateTemplate,
  useDeleteTemplate,
  useDuplicateTemplate,
};
