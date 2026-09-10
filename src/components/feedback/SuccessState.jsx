import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SuccessState({
  title = 'Success!',
  description,
  icon: Icon,
  action,
  className,
  children,
}) {
  const DisplayIcon = Icon || CheckCircle2;

  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-12 px-4 text-center',
      className
    )}>
      <div className="p-4 rounded-full bg-emerald-500/10 mb-4">
        <DisplayIcon className="size-8 text-emerald-500" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">{description}</p>
      )}
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function SuccessToast({ message, className }) {
  return (
    <div className={cn('flex items-center gap-2 text-sm text-emerald-600', className)}>
      <CheckCircle2 className="size-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export default SuccessState;
