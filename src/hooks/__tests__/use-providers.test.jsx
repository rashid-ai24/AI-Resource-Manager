import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProviders } from '../use-providers';

vi.mock('../../lib/ipc', () => ({
  ipc: {
    providers: {
      list: vi.fn(),
      get: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

import { ipc } from '../../lib/ipc';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useProviders', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches providers list', async () => {
    const mockProviders = [
      { id: 1, name: 'OpenAI' },
      { id: 2, name: 'Anthropic' },
    ];
    ipc.providers.list.mockResolvedValue(mockProviders);

    const { result } = renderHook(() => useProviders(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockProviders);
  });

  it('creates a provider', async () => {
    const newProvider = { id: 3, name: 'New Provider' };
    ipc.providers.create.mockResolvedValue(newProvider);
    ipc.providers.list.mockResolvedValue([newProvider]);

    const { result } = renderHook(() => useProviders(), {
      wrapper: createWrapper(),
    });

    await result.current.create.mutateAsync({ name: 'New Provider' });

    expect(ipc.providers.create).toHaveBeenCalledWith({ name: 'New Provider' });
  });

  it('updates a provider', async () => {
    const updatedProvider = { id: 1, name: 'Updated' };
    ipc.providers.update.mockResolvedValue(updatedProvider);
    ipc.providers.list.mockResolvedValue([updatedProvider]);

    const { result } = renderHook(() => useProviders(), {
      wrapper: createWrapper(),
    });

    await result.current.update.mutateAsync({ id: 1, name: 'Updated' });

    expect(ipc.providers.update).toHaveBeenCalledWith(1, { name: 'Updated' });
  });

  it('deletes a provider', async () => {
    ipc.providers.delete.mockResolvedValue({ id: 1 });
    ipc.providers.list.mockResolvedValue([]);

    const { result } = renderHook(() => useProviders(), {
      wrapper: createWrapper(),
    });

    await result.current.remove.mutateAsync(1);

    expect(ipc.providers.delete).toHaveBeenCalledWith(1);
  });
});
