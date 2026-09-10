import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const AutocompleteInput = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
        'placeholder:text-muted-foreground',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
});

AutocompleteInput.displayName = 'AutocompleteInput';

export { AutocompleteInput };
export default AutocompleteInput;
