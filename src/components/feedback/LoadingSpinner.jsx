import { cn } from '@/lib/utils';

const sizes = {
  xs: 'size-3 border',
  sm: 'size-4 border-2',
  default: 'size-6 border-2',
  lg: 'size-8 border-[3px]',
  xl: 'size-12 border-[3px]',
};

export function LoadingSpinner({ size = 'default', className, label = 'Loading...' }) {
  return (
    <div className={cn('flex items-center justify-center', className)} role="status">
      <div
        className={cn(
          'animate-spin rounded-full border-primary/20 border-t-primary',
          sizes[size]
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function LoadingOverlay({ size = 'lg', label = 'Loading...' }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <LoadingSpinner size={size} label={label} />
    </div>
  );
}

export function LoadingPage({ size = 'lg', label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
      <LoadingSpinner size={size} label={label} />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function LoadingButton({ size = 'sm', className }) {
  return <LoadingSpinner size={size} className={className} label="Saving..." />;
}

export default LoadingSpinner;
