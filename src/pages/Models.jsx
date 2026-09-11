import { useState } from 'react';
import { ModelList, ModelForm } from '../components/features/models';
import { useModels } from '../hooks/use-models';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

export default function Models() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { create } = useModels();

  const handleCreate = (data) => {
    create.mutate(data, {
      onSuccess: () => setIsCreateOpen(false),
    });
  };

  return (
    <>
      <ModelList onCreateClick={() => setIsCreateOpen(true)} />

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Model</DialogTitle>
          </DialogHeader>
          <ModelForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={create.isPending}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
