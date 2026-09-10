import { useEffect } from 'react';
import { useCommandPaletteStore } from '../stores/command-palette-store';

export function useKeyboardShortcuts() {
  const { togglePalette } = useCommandPaletteStore();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        togglePalette();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePalette]);
}

export default useKeyboardShortcuts;
