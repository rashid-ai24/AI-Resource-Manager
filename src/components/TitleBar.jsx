import { Minus, Square, X } from 'lucide-react';

export default function TitleBar() {
  return (
    <div className="h-9 flex items-center justify-between bg-background border-b border-border select-none"
         style={{ WebkitAppRegion: 'drag' }}>
      <div className="px-4 text-xs font-medium text-muted-foreground">
        AI Resource Manager
      </div>
      <div className="flex h-full" style={{ WebkitAppRegion: 'no-drag' }}>
        <button
          onClick={() => window.api.window.minimize()}
          className="h-full px-3 hover:bg-muted transition-colors flex items-center justify-center"
        >
          <Minus className="size-3.5 text-muted-foreground" />
        </button>
        <button
          onClick={() => window.api.window.maximize()}
          className="h-full px-3 hover:bg-muted transition-colors flex items-center justify-center"
        >
          <Square className="size-2.5 text-muted-foreground" />
        </button>
        <button
          onClick={() => window.api.window.close()}
          className="h-full px-3 hover:bg-destructive/15 transition-colors flex items-center justify-center"
        >
          <X className="size-3.5 text-muted-foreground hover:text-destructive" />
        </button>
      </div>
    </div>
  );
}
