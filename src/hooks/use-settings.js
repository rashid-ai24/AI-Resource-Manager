import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ipc } from '../lib/ipc';

export function useSettings() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading, error } = useQuery({
    queryKey: ['settings'],
    queryFn: () => ipc.settings.getAll(),
    staleTime: 1000 * 60,
  });

  const setSetting = useMutation({
    mutationFn: ({ key, value, description }) => ipc.settings.set(key, value, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });

  const getSetting = (key) => {
    if (!settings) return undefined;
    return settings[key];
  };

  return {
    settings: settings || {},
    isLoading,
    error,
    setSetting: setSetting.mutate,
    setSettingAsync: setSetting.mutateAsync,
    isSetting: setSetting.isPending,
    getSetting,
  };
}

export default useSettings;
