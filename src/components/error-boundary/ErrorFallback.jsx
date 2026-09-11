import { AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function ErrorFallback({
  error,
  onRetry,
  resetErrorBoundary,
  className,
}) {
  const handleRetry = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else if (onRetry) {
      onRetry();
    }
  };

  return (
    <div className={cn(
      'flex flex-col items-center justify-center min-h-[400px] p-8 text-center',
      className
    )}>
      <div className="p-4 rounded-full bg-destructive/10 mb-4">
        <AlertTriangle className="size-8 text-destructive" />
      </div>
      
      <h2 className="text-lg font-semibold mb-2">
        Something went wrong
      </h2>
      
      <p className="text-sm text-muted-foreground mb-4 max-w-md">
        An unexpected error occurred. Please try again or refresh the page.
      </p>

      {error && process.env.NODE_ENV === 'development' && (
        <pre className="mb-4 text-xs text-left bg-muted p-3 rounded-lg max-w-md overflow-auto">
          {error.message || String(error)}
        </pre>
      )}

      <Button
        variant="outline"
        onClick={handleRetry}
        className="gap-2"
      >
        <RefreshCw className="size-4" />
        Try again
      </Button>
    </div>
  );
}

export default ErrorFallback;
