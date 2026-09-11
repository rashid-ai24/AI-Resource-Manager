import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useModel } from '../../../hooks/use-models';
import { ModelForm } from './model-form';
import { PageHeader } from '../../layout/PageHeader';
import { PageSection } from '../../layout/PageContainer';
import { LoadingPage } from '../../feedback/LoadingSpinner';
import { ErrorState } from '../../feedback/ErrorState';
import { StatusBadge, Badge } from '../../common/Badge';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';

import { Brain, Pencil, Trash2 } from 'lucide-react';

export function ModelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: model, isLoading, error, update, remove } = useModel(id);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (isLoading) return <LoadingPage label="Loading model..." />;
  if (error) return <ErrorState error={error} />;
  if (!model) return <ErrorState title="Model not found" />;

  const handleUpdate = (data) => {
    update.mutate(data, {
      onSuccess: () => setIsEditOpen(false),
    });
  };

  const handleDelete = () => {
    remove.mutate(undefined, {
      onSuccess: () => navigate('/models'),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={model.name}
        description={model.description || undefined}
        icon={Brain}
        breadcrumbs={[
          { label: 'Models', onClick: () => navigate('/models') },
          { label: model.name },
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
              <StatusBadge status={model.is_active ? 'active' : 'inactive'} />
            </div>
            {model.provider_name && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Provider</span>
                <Badge variant="outline">{model.provider_name}</Badge>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Created</span>
              <span className="text-sm">{new Date(model.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Updated</span>
              <span className="text-sm">{new Date(model.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        </PageSection>

        <PageSection title="Pricing & Capabilities">
          <div className="space-y-3">
            {model.max_tokens && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Max Tokens</span>
                <span className="text-sm font-medium">{model.max_tokens.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Input Cost</span>
              <span className="text-sm">${model.cost_per_1k_input != null ? model.cost_per_1k_input.toFixed(4) : '—'} / 1K tokens</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Output Cost</span>
              <span className="text-sm">${model.cost_per_1k_output != null ? model.cost_per_1k_output.toFixed(4) : '—'} / 1K tokens</span>
            </div>
          </div>
        </PageSection>
      </div>

      {model.description && (
        <PageSection title="Description">
          <p className="text-sm text-muted-foreground">{model.description}</p>
        </PageSection>
      )}

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Model</DialogTitle>
          </DialogHeader>
          <ModelForm
            model={model}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditOpen(false)}
            isLoading={update.isPending}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Model</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete &quot;{model.name}&quot;? This action cannot be undone.
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

export default ModelDetail;
