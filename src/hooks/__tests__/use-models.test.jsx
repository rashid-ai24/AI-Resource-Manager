import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useModels } from '../use-models';

vi.mock('../../lib/ipc', () => ({
  ipc: {
    models: {
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

describe('useModels', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches models list', async () => {
    const mockModels = [
      { id: 1, name: 'GPT-4' },
      { id: 2, name: 'Claude' },
    ];
    ipc.models.list.mockResolvedValue(mockModels);

    const { result } = renderHook(() => useModels(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockModels);
  });

  it('creates a model', async () => {
    const newModel = { id: 3, name: 'New Model' };
    ipc.models.create.mockResolvedValue(newModel);
    ipc.models.list.mockResolvedValue([newModel]);

    const { result } = renderHook(() => useModels(), {
      wrapper: createWrapper(),
    });

    await result.current.create.mutateAsync({ name: 'New Model' });

    expect(ipc.models.create).toHaveBeenCalledWith({ name: 'New Model' });
  });
});
