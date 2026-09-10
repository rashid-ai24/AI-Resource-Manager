import { Search, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function SearchEntry({ onClick, className, placeholder = 'Search...', shortcut = 'K' }) {
  return (
    <Button
      variant="outline"
      className={cn(
        'w-full justify-start gap-2 text-muted-foreground h-9 px-3',
        className
      )}
      onClick={onClick}
      aria-label="Open search"
    >
      <Search className="size-4 shrink-0" />
      <span className="flex-1 text-left text-sm">{placeholder}</span>
      {shortcut && (
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <Command className="size-2.5" />{shortcut}
        </kbd>
      )}
    </Button>
  );
}

export default SearchEntry;
