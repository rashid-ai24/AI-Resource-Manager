import { useState } from 'react';
import { ProjectList, ProjectForm } from '../components/features/projects';
import { useProjects } from '../hooks/use-projects';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

export default function Projects() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { create } = useProjects();

  const handleCreate = (data) => {
    create.mutate(data, {
      onSuccess: () => setIsCreateOpen(false),
    });
  };

  return (
    <>
      <ProjectList onCreateClick={() => setIsCreateOpen(true)} />

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader>
          <ProjectForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={create.isPending}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
