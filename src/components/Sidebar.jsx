import { NavLink } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, LayoutDashboard, Bot, Building2, Cpu, User, Key, FolderOpen, FileText, Tag, Settings, ChevronLeft, Search, BarChart3, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from './common/ThemeSwitcher';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/agents', label: 'AI Agents', icon: Bot },
  { to: '/providers', label: 'Providers', icon: Building2 },
  { to: '/models', label: 'Models', icon: Cpu },
  { to: '/accounts', label: 'Accounts', icon: User },
  { to: '/api-keys', label: 'API Keys', icon: Key },
  { to: '/projects', label: 'Projects', icon: FolderOpen },
  { to: '/notes', label: 'Notes', icon: FileText },
  { to: '/tags', label: 'Tags', icon: Tag },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/activity', label: 'Activity', icon: Clock },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ collapsed = false, onToggleCollapse }) {
  return (
    <aside className={cn(
      'h-full bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300',
      collapsed ? 'w-16' : 'w-56'
    )}>
      {!collapsed && (
        <div className="p-5 border-b border-sidebar-border">
          <h1 className="text-base font-bold text-sidebar-foreground tracking-tight">AI Resource Manager</h1>
          <p className="text-xs text-muted-foreground mt-0.5">v2.0.0</p>
        </div>
      )}

      <nav className={cn(
        'flex-1 p-3 gap-1 flex flex-col',
        collapsed && 'items-center'
      )}>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 rounded-lg text-sm font-medium transition-colors',
                collapsed ? 'justify-center p-2' : 'px-3 py-2',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )
            }
            title={collapsed ? label : undefined}
          >
            <Icon className="size-4 shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className={cn(
        'p-3 border-t border-sidebar-border',
        collapsed && 'flex flex-col items-center gap-2'
      )}>
        {!collapsed && <ThemeSwitcher className="w-full" />}
        {collapsed && <ThemeSwitcher size="icon" />}
        {onToggleCollapse && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="text-muted-foreground hover:text-sidebar-foreground"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronLeft className={cn('size-4 transition-transform', collapsed && 'rotate-180')} />
          </Button>
        )}
      </div>
    </aside>
  );
}
