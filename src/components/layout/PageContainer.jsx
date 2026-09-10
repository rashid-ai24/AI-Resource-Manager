import { cn } from '@/lib/utils';

export function PageContainer({ children, className, padded = true }) {
  return (
    <div
      className={cn(
        'h-full flex flex-col',
        padded && 'p-6',
        className
      )}
    >
      {children}
    </div>
  );
}

export function PageContent({ children, className }) {
  return (
    <div className={cn('flex-1 overflow-auto', className)}>
      {children}
    </div>
  );
}

export function PageSection({ children, title, description, className, headerClassName }) {
  return (
    <section className={cn('space-y-4', className)}>
      {(title || description) && (
        <div className={cn('space-y-1', headerClassName)}>
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

export default PageContainer;
