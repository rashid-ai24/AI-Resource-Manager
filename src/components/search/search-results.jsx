import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../feedback/EmptyState';
import { LoadingPage } from '../feedback/LoadingSpinner';
import { Badge } from '../common/Badge';
import { Search, Bot, Building2, Cpu, User, Key, FolderOpen, FileText, Tag } from 'lucide-react';

const entityConfig = {
  agents: { label: 'Agents', icon: Bot, route: '/agents' },
  providers: { label: 'Providers', icon: Building2, route: '/providers' },
  models: { label: 'Models', icon: Cpu, route: '/models' },
  accounts: { label: 'Accounts', icon: User, route: '/accounts' },
  apiKeys: { label: 'API Keys', icon: Key, route: '/api-keys' },
  projects: { label: 'Projects', icon: FolderOpen, route: '/projects' },
  notes: { label: 'Notes', icon: FileText, route: '/notes' },
  tags: { label: 'Tags', icon: Tag, route: '/tags' },
};

export function SearchResults({ results, isLoading, query }) {
  const navigate = useNavigate();

  if (isLoading) return <LoadingPage label="Searching..." />;

  if (!query || query.trim().length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Search className="size-8 mx-auto mb-3 opacity-50" />
        <p className="text-sm">Type to search across all entities</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title="No results found"
        description={`No results for "${query}"`}
      />
    );
  }

  const totalResults = results.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {totalResults} result{totalResults !== 1 ? 's' : ''} found
        </p>
      </div>

      {results.map((group) => {
        const config = entityConfig[group.type];
        if (!config) return null;
        const Icon = config.icon;

        return (
          <div key={group.type} className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon className="size-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">{config.label}</h3>
              <Badge variant="secondary" className="text-xs">{group.items.length}</Badge>
            </div>
            <div className="rounded-lg border divide-y">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`${config.route}/${item.id}`)}
                  className="px-4 py-3 hover:bg-accent/50 cursor-pointer transition-colors"
                >
                  <div className="font-medium text-sm">{item.name || item.title || `Item ${item.id}`}</div>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SearchResults;
