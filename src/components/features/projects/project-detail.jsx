import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '../../../hooks/use-projects';
import { ProjectForm } from './project-form';
import { PageHeader } from '../../layout/PageHeader';
import { PageSection } from '../../layout/PageContainer';
import { LoadingPage } from '../../feedback/LoadingSpinner';
import { ErrorState } from '../../feedback/ErrorState';
import { StatusBadge } from '../../common/Badge';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';

import { FolderOpen, Pencil, Trash2 } from 'lucide-react';

export function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: project, isLoading, error, update, remove } = useProject(id);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (isLoading) return <LoadingPage label="Loading project..." />;
  if (error) return <ErrorState error={error} />;
  if (!project) return <ErrorState title="Project not found" />;

  const handleUpdate = (data) => {
    update.mutate(data, {
      onSuccess: () => setIsEditOpen(false),
    });
  };

  const handleDelete = () => {
    remove.mutate(undefined, {
      onSuccess: () => navigate('/projects'),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={project.name}
        description={project.description || undefined}
        icon={FolderOpen}
        breadcrumbs={[
          { label: 'Projects', onClick: () => navigate('/projects') },
          { label: project.name },
        ]}
        actions={
          <>
            <Button variant="outline" onClick={() => setIsEditOpen(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PageSection title="Information">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <StatusBadge status={project.is_active ? 'active' : 'inactive'} />
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Path</span>
              <span className="text-sm font-mono">{project.path || '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Created</span>
              <span className="text-sm">{new Date(project.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Updated</span>
              <span className="text-sm">{new Date(project.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        </PageSection>

        <PageSection title="Details">
          <div className="space-y-3">
            <div>
              <span className="text-sm text-muted-foreground">Description</span>
              <p className="text-sm mt-1">{project.description || 'No description provided.'}</p>
            </div>
          </div>
        </PageSection>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <ProjectForm
            project={project}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditOpen(false)}
            isLoading={update.isPending}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete &quot;{project.name}&quot;? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProjectDetail;
