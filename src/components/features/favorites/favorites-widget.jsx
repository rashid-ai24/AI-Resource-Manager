import { useNavigate } from 'react-router-dom';
import { Star, Trash2 } from 'lucide-react';
import { useFavorites, useToggleFavorite } from '../../hooks/use-favorites';
import { Button } from '../../common/ActionButton';
import { Badge } from '../../common/Badge';
import { Skeleton } from '../../ui/skeleton';
import { EmptyState } from '../../common/EmptyState';

const entityRoutes = {
  agent: '/agents',
  provider: '/providers',
  model: '/models',
  account: '/accounts',
  api_key: '/api-keys',
  project: '/projects',
  note: '/notes',
  tag: '/tags',
};

const entityLabels = {
  agent: 'Agent',
  provider: 'Provider',
  model: 'Model',
  account: 'Account',
  api_key: 'API Key',
  project: 'Project',
  note: 'Note',
  tag: 'Tag',
};

function FavoriteItem({ favorite, onToggle }) {
  const navigate = useNavigate();
  const route = entityRoutes[favorite.entity_type];

  const handleClick = () => {
    if (route && favorite.entity_id) {
      navigate(`${route}/${favorite.entity_id}`);
    }
  };

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
      <Star className="size-4 text-yellow-500 shrink-0 fill-current" />
      <div className="flex-1 min-w-0" onClick={handleClick}>
        <p className="text-sm font-medium truncate">{favorite.entity_name || `Unknown ${favorite.entity_type}`}</p>
        <p className="text-xs text-muted-foreground">{entityLabels[favorite.entity_type] || favorite.entity_type}</p>
      </div>
      {favorite.notes && (
        <span className="text-xs text-muted-foreground truncate max-w-24">{favorite.notes}</span>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onToggle({ entityType: favorite.entity_type, entityId: favorite.entity_id });
        }}
        title="Remove from favorites"
      >
        <Trash2 className="size-3 text-muted-foreground" />
      </Button>
    </div>
  );
}

function FavoritesWidget({ entityType, limit = 10 }) {
  const { data: favorites, isLoading } = useFavorites({ entityType, limit });
  const toggleMutation = useToggleFavorite();

  const handleToggle = ({ entityType, entityId }) => {
    toggleMutation.mutate({ entityType, entityId });
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-2">
            <Skeleton className="size-4" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <EmptyState
        title="No favorites"
        description="Star items to see them here."
        icon={Star}
      />
    );
  }

  return (
    <div className="space-y-1">
      {favorites.map((favorite) => (
        <FavoriteItem
          key={`${favorite.entity_type}-${favorite.entity_id}`}
          favorite={favorite}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}

export { FavoritesWidget };
export default FavoritesWidget;
