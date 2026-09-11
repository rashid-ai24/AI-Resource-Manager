import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModels } from '../../../hooks/use-models';
import { modelColumns } from './model-columns';
import { ModelCard } from './model-card';
import { PageHeader } from '../../layout/PageHeader';
import { EmptyState } from '../../feedback/EmptyState';
import { LoadingPage } from '../../feedback/LoadingSpinner';
import { ErrorState } from '../../feedback/ErrorState';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../common/Badge';
import { Brain, Plus, Search, LayoutGrid, List } from 'lucide-react';

export function ModelList({ onCreateClick }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('list');

  const filters = {};
  if (search) filters.search = search;

  const { data: models, isLoading, error, refetch } = useModels(filters);

  const handleRowClick = (model) => {
    navigate(`/models/${model.id}`);
  };

  if (isLoading) return <LoadingPage label="Loading models..." />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  const list = models || [];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Models"
        description="Manage your AI models"
        icon={Brain}
        actions={
          <Button onClick={onCreateClick}>
            <Plus className="mr-2 h-4 w-4" />
            Add Model
          </Button>
        }
      />

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search models..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-1 border rounded-md p-0.5">
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            className="size-8"
            onClick={() => setViewMode('list')}
          >
            <List className="size-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            className="size-8"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="size-4" />
          </Button>
        </div>
        <Badge variant="secondary">{list.length}</Badge>
      </div>

      {list.length === 0 ? (
        <EmptyState
          icon={Brain}
          title="No models found"
          description={search ? 'Try a different search term.' : 'Add your first model to get started.'}
          action={
            !search && (
              <Button onClick={onCreateClick}>
                <Plus className="mr-2 h-4 w-4" />
                Add Model
              </Button>
            )
          }
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              onClick={handleRowClick}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                {modelColumns.map((col) => (
                  <th
                    key={col.accessorKey || col.id}
                    className="h-10 px-4 text-left text-xs font-medium text-muted-foreground"
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((model) => (
                <tr
                  key={model.id}
                  onClick={() => handleRowClick(model)}
                  className="border-b last:border-b-0 hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  {modelColumns.map((col) => (
                    <td key={col.accessorKey || col.id} className="px-4 py-3">
                      {col.cell
                        ? col.cell({ row: { getValue: (key) => model[key], original: model } })
                        : model[col.accessorKey]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ModelList;
