import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const themes = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

export function ThemeSwitcher({ className, variant = 'ghost', size = 'icon' }) {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const currentIndex = themes.findIndex(t => t.value === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].value);
  };

  const currentTheme = themes.find(t => t.value === theme) || themes[2];
  const Icon = currentTheme.icon;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={cycleTheme}
      className={cn('relative', className)}
      aria-label={`Switch to ${themes[(themes.findIndex(t => t.value === theme) + 1) % themes.length].label} theme`}
      title={`Current: ${currentTheme.label}`}
    >
      <Icon className="size-4" />
    </Button>
  );
}

export function ThemeSwitcherDropdown({ className }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={cn('flex items-center gap-1 p-1 rounded-lg bg-muted', className)}>
      {themes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors',
            theme === value
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
          aria-label={`${label} theme`}
          aria-pressed={theme === value}
        >
          <Icon className="size-3.5" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

export default ThemeSwitcher;
