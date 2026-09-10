import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const AutocompleteItem = forwardRef(({ className, isSelected, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="option"
      aria-selected={isSelected}
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        'hover:bg-accent hover:text-accent-foreground',
        isSelected && 'bg-accent text-accent-foreground',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

AutocompleteItem.displayName = 'AutocompleteItem';

export { AutocompleteItem };
export default AutocompleteItem;
