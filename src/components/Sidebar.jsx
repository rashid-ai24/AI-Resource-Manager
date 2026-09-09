import { NavLink } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, LayoutDashboard, Bot, Building2, Cpu, Key, FolderOpen, FileText, Tag, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/agents', label: 'AI Agents', icon: Bot },
  { to: '/providers', label: 'Providers', icon: Building2 },
  { to: '/models', label: 'Models', icon: Cpu },
  { to: '/api-keys', label: 'API Keys', icon: Key },
  { to: '/projects', label: 'Projects', icon: FolderOpen },
  { to: '/notes', label: 'Notes', icon: FileText },
  { to: '/tags', label: 'Tags', icon: Tag },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="w-56 min-h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-5 border-b border-sidebar-border">
        <h1 className="text-base font-bold text-sidebar-foreground tracking-tight">AI Resource Manager</h1>
        <p className="text-xs text-muted-foreground mt-0.5">v2.0.0</p>
      </div>
      <nav className="flex-1 p-3 gap-1 flex flex-col">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              }`
            }
          >
            <Icon className="size-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="w-full justify-start gap-2.5 text-muted-foreground hover:text-sidebar-foreground"
        >
          {theme === 'light' ? <Moon className="size-4" /> : <Sun className="size-4" />}
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </div>
    </aside>
  );
}
