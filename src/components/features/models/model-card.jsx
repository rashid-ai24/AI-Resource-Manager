import { Badge } from '../../common/Badge';

export function ModelCard({ model, onClick }) {
  return (
    <div
      onClick={() => onClick?.(model)}
      className="group rounded-lg border bg-card p-4 hover:bg-accent/50 cursor-pointer transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
            {model.name}
          </h3>
          {model.provider_name && (
            <Badge variant="outline" className="mt-1">
              {model.provider_name}
            </Badge>
          )}
        </div>
        <Badge variant={model.is_active ? 'success' : 'secondary'}>
          {model.is_active ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      {model.description && (
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
          {model.description}
        </p>
      )}

      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        {model.max_tokens && (
          <span>{model.max_tokens.toLocaleString()} tokens</span>
        )}
        {model.cost_per_1k_input > 0 && (
          <span>${model.cost_per_1k_input.toFixed(4)}/1K in</span>
        )}
      </div>
    </div>
  );
}

export default ModelCard;
