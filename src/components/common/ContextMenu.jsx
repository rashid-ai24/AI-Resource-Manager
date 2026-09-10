import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function ContextMenu({ children, items = [], className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  const handleItemClick = (item) => {
    if (!item.disabled) {
      item.onClick?.();
      setIsOpen(false);
    }
  };

  return (
    <div className={cn('relative', className)} onContextMenu={handleContextMenu}>
      {children}

      {isOpen && (
        <div
          ref={menuRef}
          className="fixed z-50 min-w-[180px] bg-popover border rounded-lg shadow-lg py-1 animate-in fade-in-0 zoom-in-95"
          style={{ left: position.x, top: position.y }}
        >
          {items.map((item, index) => {
            if (item.separator) {
              return <div key={index} className="h-px bg-border my-1" />;
            }

            return (
              <button
                key={item.id || index}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2 text-sm text-left',
                  'hover:bg-muted transition-colors',
                  item.disabled && 'opacity-50 cursor-not-allowed',
                  item.destructive && 'text-destructive hover:bg-destructive/10'
                )}
              >
                {item.icon && <item.icon className="size-4" />}
                <span className="flex-1">{item.label}</span>
                {item.shortcut && (
                  <span className="text-xs text-muted-foreground font-mono">
                    {item.shortcut}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ContextMenu;
