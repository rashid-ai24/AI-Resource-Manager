import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function SplitButton({
  label,
  icon: Icon,
  onClick,
  options = [],
  variant = 'default',
  size = 'default',
  className,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative inline-flex', className)} ref={menuRef}>
      <Button
        variant={variant}
        size={size}
        onClick={onClick}
        disabled={disabled}
        className="rounded-r-none"
      >
        {Icon && <Icon className="size-4" />}
        {label}
      </Button>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(prev => !prev)}
        disabled={disabled}
        className="rounded-l-none px-2 border-l border-primary-foreground/20"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <ChevronDown className="size-4" />
      </Button>

      {isOpen && options.length > 0 && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-popover border rounded-lg shadow-lg py-1 z-50">
          {options.map((option, index) => (
            <button
              key={option.value || index}
              onClick={() => {
                option.onClick?.();
                setIsOpen(false);
              }}
              disabled={option.disabled}
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2 text-sm text-left',
                'hover:bg-muted transition-colors',
                option.disabled && 'opacity-50 cursor-not-allowed',
                option.destructive && 'text-destructive hover:bg-destructive/10'
              )}
            >
              {option.icon && <option.icon className="size-4" />}
              <span className="flex-1">{option.label}</span>
              {option.selected && <Check className="size-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SplitButton;
