import { useState } from 'react';
import { ProviderList, ProviderForm } from '../components/features/providers';
import { useProviders } from '../hooks/use-providers';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

export default function Providers() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { create } = useProviders();

  const handleCreate = (data) => {
    create.mutate(data, {
      onSuccess: () => setIsCreateOpen(false),
    });
  };

  return (
    <>
      <ProviderList onCreateClick={() => setIsCreateOpen(true)} />

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Provider</DialogTitle>
          </DialogHeader>
          <ProviderForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={create.isPending}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
