import { cn } from '@/lib/utils';

export function CommandItem({ command, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(command)}
      className={cn(
        'flex items-center gap-3 px-3 py-2 cursor-pointer rounded-md transition-colors',
        isSelected ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
      )}
    >
      {command.icon && <command.icon className="size-4 shrink-0 text-muted-foreground" />}
      <div className="flex-1 min-w-0">
        <span className="text-sm">{command.label}</span>
        {command.description && (
          <p className="text-xs text-muted-foreground truncate">{command.description}</p>
        )}
      </div>
      {command.shortcut && (
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          {command.shortcut}
        </kbd>
      )}
    </div>
  );
}

export default CommandItem;
