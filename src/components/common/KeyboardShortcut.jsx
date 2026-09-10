import { cn } from '@/lib/utils';

const keySymbols = {
  cmd: '⌘',
  command: '⌘',
  ctrl: '⌃',
  control: '⌃',
  alt: '⌥',
  option: '⌥',
  shift: '⇧',
  enter: '↵',
  return: '↵',
  escape: 'Esc',
  esc: 'Esc',
  tab: '⇥',
  space: 'Space',
  backspace: '⌫',
  delete: '⌦',
  arrowup: '↑',
  arrowdown: '↓',
  arrowleft: '←',
  arrowright: '→',
  up: '↑',
  down: '↓',
  left: '←',
  right: '→',
};

export function KeyboardShortcut({ keys = [], className, size = 'sm' }) {
  const sizeClasses = {
    xs: 'text-[10px] h-4 min-w-4 px-1',
    sm: 'text-xs h-5 min-w-5 px-1.5',
    md: 'text-sm h-6 min-w-6 px-2',
  };

  return (
    <div className={cn('inline-flex items-center gap-0.5', className)}>
      {keys.map((key, index) => {
        const symbol = keySymbols[key.toLowerCase()] || key.toUpperCase();
        return (
          <kbd
            key={index}
            className={cn(
              'inline-flex items-center justify-center font-mono font-medium rounded border bg-muted text-muted-foreground',
              sizeClasses[size]
            )}
          >
            {symbol}
          </kbd>
        );
      })}
    </div>
  );
}

export function KeyboardShortcutList({ shortcuts = [], className }) {
  return (
    <div className={cn('space-y-2', className)}>
      {shortcuts.map((shortcut, index) => (
        <div key={index} className="flex items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">{shortcut.label}</span>
          <KeyboardShortcut keys={shortcut.keys} />
        </div>
      ))}
    </div>
  );
}

export function ShortcutHint({ keys, className }) {
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs text-muted-foreground', className)}>
      <KeyboardShortcut keys={keys} size="xs" />
    </span>
  );
}

export default KeyboardShortcut;
