import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const AutocompleteGroup = forwardRef(({ className, label, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      className={cn('p-1', className)}
      {...props}
    >
      {label && (
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
          {label}
        </div>
      )}
      {children}
    </div>
  );
});

AutocompleteGroup.displayName = 'AutocompleteGroup';

export { AutocompleteGroup };
export default AutocompleteGroup;
