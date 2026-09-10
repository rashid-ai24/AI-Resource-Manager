import { cn } from '@/lib/utils';
import { Badge } from './Badge';

const providerColors = {
  openai: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', dot: 'bg-emerald-500' },
  anthropic: { bg: 'bg-amber-500/10', text: 'text-amber-600', dot: 'bg-amber-500' },
  google: { bg: 'bg-blue-500/10', text: 'text-blue-600', dot: 'bg-blue-500' },
  meta: { bg: 'bg-indigo-500/10', text: 'text-indigo-600', dot: 'bg-indigo-500' },
  mistral: { bg: 'bg-orange-500/10', text: 'text-orange-600', dot: 'bg-orange-500' },
  local: { bg: 'bg-purple-500/10', text: 'text-purple-600', dot: 'bg-purple-500' },
};

export function ProviderBadge({ name, color, className, ...props }) {
  const slug = name?.toLowerCase().replace(/\s+/g, '') || '';
  const colors = providerColors[slug] || providerColors.local;

  return (
    <Badge
      variant="outline"
      className={cn('gap-1.5', colors.bg, colors.text, className)}
      {...props}
    >
      <span
        className={cn('size-2 rounded-full', colors.dot)}
        style={color ? { backgroundColor: color } : undefined}
      />
      {name}
    </Badge>
  );
}

export default ProviderBadge;
