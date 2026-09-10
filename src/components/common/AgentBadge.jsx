import { cn } from '@/lib/utils';
import { Badge } from './Badge';

const agentStatusConfig = {
  active: { variant: 'success', dot: 'bg-emerald-500' },
  inactive: { variant: 'secondary', dot: 'bg-muted-foreground/50' },
  archived: { variant: 'outline', dot: 'bg-muted-foreground/30' },
};

export function AgentBadge({ status = 'active', name, className, ...props }) {
  const config = agentStatusConfig[status] || agentStatusConfig.inactive;

  return (
    <Badge variant={config.variant} className={cn('gap-1.5', className)} {...props}>
      <span className={cn('size-1.5 rounded-full', config.dot)} />
      {name || status}
    </Badge>
  );
}

export default AgentBadge;
