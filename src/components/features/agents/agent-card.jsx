import { Badge } from '../../common/Badge';
import { StatusBadge } from '../../common/Badge';
import { Bot } from 'lucide-react';

export function AgentCard({ agent, onClick }) {
  const tags = agent.tag_names ? agent.tag_names.split(',').slice(0, 3) : [];

  return (
    <div
      onClick={() => onClick?.(agent)}
      className="group rounded-lg border bg-card p-4 hover:bg-accent/50 cursor-pointer transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
            <Bot className="size-4 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
              {agent.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {agent.provider_name && (
                <Badge variant="outline" className="text-xs">
                  {agent.provider_name}
                </Badge>
              )}
              {agent.model_name && (
                <Badge variant="outline" className="text-xs">
                  {agent.model_name}
                </Badge>
              )}
            </div>
          </div>
        </div>
        <StatusBadge status={agent.is_active ? 'active' : 'inactive'} />
      </div>

      {agent.description && (
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
          {agent.description}
        </p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {tag.trim()}
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        {agent.temperature != null && (
          <span>Temp: {agent.temperature}</span>
        )}
        {agent.max_tokens && (
          <span>Tokens: {agent.max_tokens.toLocaleString()}</span>
        )}
      </div>
    </div>
  );
}

export default AgentCard;
