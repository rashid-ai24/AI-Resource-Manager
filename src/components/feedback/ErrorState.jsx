import { AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function ErrorState({
  title = 'Something went wrong',
  description,
  error,
  onRetry,
  className,
  children,
}) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-12 px-4 text-center',
      className
    )}>
      <div className="p-4 rounded-full bg-destructive/10 mb-4">
        <AlertTriangle className="size-8 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">{description}</p>
      )}
      {error && process.env.NODE_ENV === 'development' && (
        <pre className="mt-4 text-xs text-left bg-muted p-3 rounded-lg max-w-md overflow-auto">
          {error.message || String(error)}
        </pre>
      )}
      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="mt-4 gap-2"
        >
          <RefreshCw className="size-4" />
          Try again
        </Button>
      )}
      {children}
    </div>
  );
}

export function ErrorInline({ message, className }) {
  return (
    <div className={cn('flex items-center gap-2 text-sm text-destructive', className)}>
      <AlertTriangle className="size-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export default ErrorState;
