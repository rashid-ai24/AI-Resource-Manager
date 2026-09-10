import { cn } from '@/lib/utils';
import { Badge } from './Badge';

export function ModelBadge({ name, provider, className, ...props }) {
  return (
    <Badge variant="secondary" className={cn('gap-1.5', className)} {...props}>
      {provider && (
        <span className="text-muted-foreground">{provider}</span>
      )}
      <span className="font-medium">{name}</span>
    </Badge>
  );
}

export function ModelBadgeGroup({ models = [], maxDisplay = 2, className }) {
  const displayModels = models.slice(0, maxDisplay);
  const remaining = models.length - maxDisplay;

  return (
    <div className={cn('flex items-center gap-1 flex-wrap', className)}>
      {displayModels.map((model, index) => (
        <ModelBadge
          key={model.id || index}
          name={model.name}
          provider={model.provider?.name}
        />
      ))}
      {remaining > 0 && (
        <Badge variant="outline" className="text-muted-foreground">
          +{remaining} more
        </Badge>
      )}
    </div>
  );
}

export default ModelBadge;
