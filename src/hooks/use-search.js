import { useQuery } from '@tanstack/react-query';
import { ipc } from '../lib/ipc';

export function useSearch(query) {
  const searchQuery = useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!query || query.trim().length === 0) {
        return { results: [], isLoading: false };
      }

      const q = query.trim();
      const searches = [
        { type: 'agents', fn: () => ipc.agents.list({ search: q }) },
        { type: 'providers', fn: () => ipc.providers.list({ search: q }) },
        { type: 'models', fn: () => ipc.models.list({ search: q }) },
        { type: 'accounts', fn: () => ipc.accounts.list({ search: q }) },
        { type: 'apiKeys', fn: () => ipc.apiKeys.list({ search: q }) },
        { type: 'projects', fn: () => ipc.projects.list({ search: q }) },
        { type: 'notes', fn: () => ipc.notes.list({ search: q }) },
        { type: 'tags', fn: () => ipc.tags.list({ search: q }) },
      ];

      const settled = await Promise.allSettled(
        searches.map((s) => s.fn().then((data) => ({ type: s.type, items: data || [] })))
      );

      const results = settled
        .filter((r) => r.status === 'fulfilled' && r.value.items.length > 0)
        .map((r) => r.value);

      return { results };
    },
    enabled: !!query && query.trim().length > 0,
    staleTime: 1000 * 60,
  });

  return {
    results: searchQuery.data?.results || [],
    isLoading: searchQuery.isLoading,
    error: searchQuery.error,
    refetch: searchQuery.refetch,
  };
}

export default useSearch;
