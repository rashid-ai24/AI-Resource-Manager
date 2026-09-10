import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const AutocompleteList = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="listbox"
      className={cn(
        'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md',
        'animate-in fade-in-0 zoom-in-95',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

AutocompleteList.displayName = 'AutocompleteList';

export { AutocompleteList };
export default AutocompleteList;
