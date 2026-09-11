import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../../hooks/use-projects';
import { projectColumns } from './project-columns';
import { ProjectCard } from './project-card';
import { PageHeader } from '../../layout/PageHeader';
import { EmptyState } from '../../feedback/EmptyState';
import { LoadingPage } from '../../feedback/LoadingSpinner';
import { ErrorState } from '../../feedback/ErrorState';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../common/Badge';
import { FolderOpen, Plus, Search, LayoutGrid, List } from 'lucide-react';

export function ProjectList({ onCreateClick }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('list');

  const filters = {};
  if (search) filters.search = search;

  const { data: projects, isLoading, error, refetch } = useProjects(filters);

  const handleRowClick = (project) => {
    navigate(`/projects/${project.id}`);
  };

  if (isLoading) return <LoadingPage label="Loading projects..." />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  const list = projects || [];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Projects"
        description="Manage your projects"
        icon={FolderOpen}
        actions={
          <Button onClick={onCreateClick}>
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        }
      />

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
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
          icon={FolderOpen}
          title="No projects found"
          description={search ? 'Try a different search term.' : 'Add your first project to get started.'}
          action={
            !search && (
              <Button onClick={onCreateClick}>
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            )
          }
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={handleRowClick}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                {projectColumns.map((col) => (
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
              {list.map((project) => (
                <tr
                  key={project.id}
                  onClick={() => handleRowClick(project)}
                  className="border-b last:border-b-0 hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  {projectColumns.map((col) => (
                    <td key={col.accessorKey || col.id} className="px-4 py-3">
                      {col.cell
                        ? col.cell({ row: { getValue: (key) => project[key], original: project } })
                        : project[col.accessorKey]}
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

export default ProjectList;
