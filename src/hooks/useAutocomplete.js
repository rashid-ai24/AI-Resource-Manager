import { useState, useCallback, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ipc } from '../lib/ipc';

export function useAutocomplete(entityType, options = {}) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: [entityType, 'search', query],
    queryFn: async () => {
      const result = await ipc[entityType].findAll({ search: query, limit: 20 });
      return result.success ? result.data : [];
    },
    enabled: query.length >= 1 && isOpen,
    staleTime: 30000,
  });

  const results = data || [];

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          options.onSelect?.(results[selectedIndex]);
          setIsOpen(false);
          setQuery('');
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  }, [results, selectedIndex, options]);

  const handleSelect = useCallback((item) => {
    options.onSelect?.(item);
    setIsOpen(false);
    setQuery('');
  }, [options]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setSelectedIndex(-1);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSelectedIndex(-1);
    setQuery('');
  }, []);

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[role="option"]');
      items[selectedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  return {
    query,
    setQuery,
    isOpen,
    setIsOpen: handleOpen,
    closePalette: handleClose,
    results,
    isLoading,
    selectedIndex,
    setSelectedIndex,
    inputRef,
    listRef,
    handleKeyDown,
    handleSelect,
  };
}

export default useAutocomplete;
