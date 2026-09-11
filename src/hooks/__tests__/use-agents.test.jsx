import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAgents } from '../use-agents';

// Mock the ipc module
vi.mock('../../lib/ipc', () => ({
  ipc: {
    agents: {
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

describe('useAgents', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches agents list', async () => {
    const mockAgents = [
      { id: 1, name: 'Agent 1' },
      { id: 2, name: 'Agent 2' },
    ];
    ipc.agents.list.mockResolvedValue(mockAgents);

    const { result } = renderHook(() => useAgents(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockAgents);
    expect(ipc.agents.list).toHaveBeenCalled();
  });

  it('creates an agent', async () => {
    const newAgent = { id: 3, name: 'New Agent' };
    ipc.agents.create.mockResolvedValue(newAgent);
    ipc.agents.list.mockResolvedValue([newAgent]);

    const { result } = renderHook(() => useAgents(), {
      wrapper: createWrapper(),
    });

    await result.current.create.mutateAsync({ name: 'New Agent' });

    expect(ipc.agents.create).toHaveBeenCalledWith({ name: 'New Agent' });
  });

  it('updates an agent', async () => {
    const updatedAgent = { id: 1, name: 'Updated Agent' };
    ipc.agents.update.mockResolvedValue(updatedAgent);
    ipc.agents.list.mockResolvedValue([updatedAgent]);

    const { result } = renderHook(() => useAgents(), {
      wrapper: createWrapper(),
    });

    await result.current.update.mutateAsync({ id: 1, name: 'Updated Agent' });

    expect(ipc.agents.update).toHaveBeenCalledWith(1, { name: 'Updated Agent' });
  });

  it('deletes an agent', async () => {
    ipc.agents.delete.mockResolvedValue({ id: 1 });
    ipc.agents.list.mockResolvedValue([]);

    const { result } = renderHook(() => useAgents(), {
      wrapper: createWrapper(),
    });

    await result.current.remove.mutateAsync(1);

    expect(ipc.agents.delete).toHaveBeenCalledWith(1);
  });

  it('handles errors', async () => {
    ipc.agents.list.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useAgents(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeDefined();
  });
});
