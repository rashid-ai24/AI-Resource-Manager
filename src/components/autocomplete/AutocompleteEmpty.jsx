import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const AutocompleteEmpty = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="option"
      aria-disabled="true"
      className={cn(
        'relative flex cursor-not-allowed select-none items-center rounded-sm px-2 py-1.5 text-sm text-muted-foreground',
        className
      )}
      {...props}
    >
      {children || 'No results found'}
    </div>
  );
});

AutocompleteEmpty.displayName = 'AutocompleteEmpty';

export { AutocompleteEmpty };
export default AutocompleteEmpty;
