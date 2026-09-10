import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function NavigationRail({ items = [], className }) {
  const location = useLocation();

  return (
    <nav
      className={cn('flex flex-col gap-1 p-2', className)}
      aria-label="Navigation"
    >
      {items.map((item) => {
        const isActive = item.exact
          ? location.pathname === item.to
          : location.pathname.startsWith(item.to);

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={cn(
              'flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-colors',
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.icon && <item.icon className="size-5" />}
            <span className="truncate max-w-full">{item.label}</span>
            {item.badge && (
              <span className="ml-auto text-[10px] font-medium bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default NavigationRail;
