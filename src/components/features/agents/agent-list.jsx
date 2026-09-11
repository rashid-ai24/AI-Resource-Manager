import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgents } from '../../../hooks/use-agents';
import { agentColumns } from './agent-columns';
import { AgentCard } from './agent-card';
import { PageHeader } from '../../layout/PageHeader';
import { EmptyState } from '../../feedback/EmptyState';
import { LoadingPage } from '../../feedback/LoadingSpinner';
import { ErrorState } from '../../feedback/ErrorState';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../common/Badge';
import { Bot, Plus, Search, LayoutGrid, List } from 'lucide-react';

export function AgentList({ onCreateClick }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('list');

  const filters = {};
  if (search) filters.search = search;

  const { data: agents, isLoading, error, refetch } = useAgents(filters);

  const handleRowClick = (agent) => {
    navigate(`/agents/${agent.id}`);
  };

  if (isLoading) return <LoadingPage label="Loading agents..." />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  const list = agents || [];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Agents"
        description="Manage your AI agents"
        icon={Bot}
        actions={
          <Button onClick={onCreateClick}>
            <Plus className="mr-2 h-4 w-4" />
            Add Agent
          </Button>
        }
      />

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
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
          icon={Bot}
          title="No agents found"
          description={search ? 'Try a different search term.' : 'Add your first agent to get started.'}
          action={
            !search && (
              <Button onClick={onCreateClick}>
                <Plus className="mr-2 h-4 w-4" />
                Add Agent
              </Button>
            )
          }
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onClick={handleRowClick}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                {agentColumns.map((col) => (
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
              {list.map((agent) => (
                <tr
                  key={agent.id}
                  onClick={() => handleRowClick(agent)}
                  className="border-b last:border-b-0 hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  {agentColumns.map((col) => (
                    <td key={col.accessorKey || col.id} className="px-4 py-3">
                      {col.cell
                        ? col.cell({ row: { getValue: (key) => agent[key], original: agent } })
                        : agent[col.accessorKey]}
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

export default AgentList;
