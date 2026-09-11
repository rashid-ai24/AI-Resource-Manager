import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommandPaletteStore } from '../stores/command-palette-store';

const shortcuts = [
  { key: 'k', ctrl: true, action: 'palette', description: 'Command Palette' },
  { key: '1', ctrl: true, action: 'navigate', path: '/', description: 'Dashboard' },
  { key: '2', ctrl: true, action: 'navigate', path: '/agents', description: 'Agents' },
  { key: '3', ctrl: true, action: 'navigate', path: '/providers', description: 'Providers' },
  { key: '4', ctrl: true, action: 'navigate', path: '/models', description: 'Models' },
  { key: '5', ctrl: true, action: 'navigate', path: '/accounts', description: 'Accounts' },
  { key: '6', ctrl: true, action: 'navigate', path: '/api-keys', description: 'API Keys' },
  { key: '7', ctrl: true, action: 'navigate', path: '/projects', description: 'Projects' },
  { key: '8', ctrl: true, action: 'navigate', path: '/notes', description: 'Notes' },
  { key: '9', ctrl: true, action: 'navigate', path: '/tags', description: 'Tags' },
  { key: '/', ctrl: true, action: 'navigate', path: '/search', description: 'Search' },
];

export function useKeyboardShortcuts() {
  const { togglePalette } = useCommandPaletteStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isCtrl = event.metaKey || event.ctrlKey;

      for (const shortcut of shortcuts) {
        if (shortcut.ctrl === isCtrl && event.key === shortcut.key) {
          event.preventDefault();

          if (shortcut.action === 'palette') {
            togglePalette();
          } else if (shortcut.action === 'navigate') {
            navigate(shortcut.path);
          }
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePalette, navigate]);
}

export { shortcuts };
export default useKeyboardShortcuts;
