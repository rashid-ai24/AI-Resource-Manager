import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, X } from 'lucide-react';
import { GenericForm } from '../components/form';
import { ApiKeyFormSchema, apiKeyFormFields } from '../lib/form-schemas';
import { ipc } from '../lib/ipc';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

export default function ApiKeys() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data) => ipc.apiKeys.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
      setIsCreateOpen(false);
    },
  });

  const handleCreate = (data) => {
    createMutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">API Keys</h1>
          <p className="text-sm text-muted-foreground">Manage your API keys</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add API Key
        </Button>
      </div>

      <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
        No API keys found. Add your first API key to get started.
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create API Key</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => setIsCreateOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <GenericForm
            schema={ApiKeyFormSchema}
            fields={apiKeyFormFields}
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            defaultValues={{
              is_active: 1,
            }}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
