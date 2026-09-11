import { Database, Wifi, WifiOff, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from '../common/ThemeSwitcher';

export function StatusBar({ className, online = true, dbStatus = 'connected' }) {
  return (
    <footer
      className={cn(
        'h-7 flex items-center justify-between px-4 bg-background border-t border-border text-xs text-muted-foreground select-none',
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5" role="status" aria-label={online ? 'Online' : 'Offline'}>
          {online ? (
            <Wifi className="size-3 text-emerald-500" />
          ) : (
            <WifiOff className="size-3 text-muted-foreground/50" />
          )}
          <span>{online ? 'Connected' : 'Offline'}</span>
        </div>

        <div className="flex items-center gap-1.5" role="status" aria-label={`Database: ${dbStatus}`}>
          <Database className={cn(
            'size-3',
            dbStatus === 'connected' ? 'text-emerald-500' : 'text-destructive'
          )} />
          <span>DB {dbStatus}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Clock className="size-3" />
          <span>v2.0.0</span>
        </div>
        <ThemeSwitcher size="xs" variant="ghost" />
      </div>
    </footer>
  );
}

export default StatusBar;
