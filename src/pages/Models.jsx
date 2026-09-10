import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, X } from 'lucide-react';
import { GenericForm } from '../components/form';
import { ModelFormSchema, modelFormFields } from '../lib/form-schemas';
import { ipc } from '../lib/ipc';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

export default function Models() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data) => ipc.models.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
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
          <h1 className="text-2xl font-bold tracking-tight">Models</h1>
          <p className="text-sm text-muted-foreground">Manage your AI models</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Model
        </Button>
      </div>

      <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
        No models found. Add your first model to get started.
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Model</DialogTitle>
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
            schema={ModelFormSchema}
            fields={modelFormFields}
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            defaultValues={{
              max_tokens: 4096,
              cost_per_1k_input: 0,
              cost_per_1k_output: 0,
              is_active: 1,
            }}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
