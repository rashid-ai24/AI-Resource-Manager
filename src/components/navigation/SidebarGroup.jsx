import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SidebarGroup({
  label,
  children,
  defaultOpen = true,
  collapsible = false,
  className,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <div
          className={cn(
            'flex items-center gap-1 px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider',
            collapsible && 'cursor-pointer hover:text-foreground transition-colors'
          )}
          onClick={() => collapsible && setIsOpen(prev => !prev)}
          role={collapsible ? 'button' : undefined}
          aria-expanded={collapsible ? isOpen : undefined}
        >
          {collapsible && (
            <span className="shrink-0">
              {isOpen ? (
                <ChevronDown className="size-3" />
              ) : (
                <ChevronRight className="size-3" />
              )}
            </span>
          )}
          <span>{label}</span>
        </div>
      )}
      {(!collapsible || isOpen) && (
        <div className="space-y-0.5">
          {children}
        </div>
      )}
    </div>
  );
}

export function SidebarGroupContent({ children, className }) {
  return (
    <div className={cn('space-y-0.5', className)}>
      {children}
    </div>
  );
}

export default SidebarGroup;
