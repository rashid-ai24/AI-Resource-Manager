import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProvider } from '../../../hooks/use-providers';
import { ProviderForm } from './provider-form';
import { PageHeader } from '../../layout/PageHeader';
import { PageSection } from '../../layout/PageContainer';
import { LoadingPage } from '../../feedback/LoadingSpinner';
import { ErrorState } from '../../feedback/ErrorState';
import { StatusBadge } from '../../common/Badge';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';

import { Building2, Pencil, Trash2, ExternalLink } from 'lucide-react';

export function ProviderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: provider, isLoading, error, update, remove } = useProvider(id);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (isLoading) return <LoadingPage label="Loading provider..." />;
  if (error) return <ErrorState error={error} />;
  if (!provider) return <ErrorState title="Provider not found" />;

  const handleUpdate = (data) => {
    update.mutate(data, {
      onSuccess: () => setIsEditOpen(false),
    });
  };

  const handleDelete = () => {
    remove.mutate(undefined, {
      onSuccess: () => navigate('/providers'),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={provider.name}
        description={provider.description || undefined}
        icon={Building2}
        breadcrumbs={[
          { label: 'Providers', onClick: () => navigate('/providers') },
          { label: provider.name },
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
              <StatusBadge status={provider.is_active ? 'active' : 'inactive'} />
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Base URL</span>
              {provider.base_url ? (
                <a
                  href={provider.base_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  {provider.base_url}
                  <ExternalLink className="size-3" />
                </a>
              ) : (
                <span className="text-sm">—</span>
              )}
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Created</span>
              <span className="text-sm">{new Date(provider.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Updated</span>
              <span className="text-sm">{new Date(provider.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        </PageSection>

        <PageSection title="Details">
          <div className="space-y-3">
            <div>
              <span className="text-sm text-muted-foreground">Description</span>
              <p className="text-sm mt-1">{provider.description || 'No description provided.'}</p>
            </div>
          </div>
        </PageSection>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Provider</DialogTitle>
          </DialogHeader>
          <ProviderForm
            provider={provider}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditOpen(false)}
            isLoading={update.isPending}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Provider</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete &quot;{provider.name}&quot;? This action cannot be undone.
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

export default ProviderDetail;
