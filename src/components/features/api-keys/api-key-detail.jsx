import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApiKey } from '../../../hooks/use-api-keys';
import { ApiKeyForm } from './api-key-form';
import { PageHeader } from '../../layout/PageHeader';
import { PageSection } from '../../layout/PageContainer';
import { LoadingPage } from '../../feedback/LoadingSpinner';
import { ErrorState } from '../../feedback/ErrorState';
import { StatusBadge, Badge } from '../../common/Badge';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Key, Pencil, Trash2, Shield, Clock } from 'lucide-react';

export function ApiKeyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: apiKey, isLoading, error, update, remove } = useApiKey(id);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (isLoading) return <LoadingPage label="Loading API key..." />;
  if (error) return <ErrorState error={error} />;
  if (!apiKey) return <ErrorState title="API key not found" />;

  const handleUpdate = (data) => {
    update.mutate(data, {
      onSuccess: () => setIsEditOpen(false),
    });
  };

  const handleDelete = () => {
    remove.mutate(undefined, {
      onSuccess: () => navigate('/api-keys'),
    });
  };

  const isExpiringSoon = apiKey.expires_at && (() => {
    const days = Math.ceil((new Date(apiKey.expires_at) - new Date()) / (1000 * 60 * 60 * 24));
    return days >= 0 && days <= 30;
  })();

  const isExpired = apiKey.expires_at && new Date(apiKey.expires_at) < new Date();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={apiKey.name}
        description={apiKey.description || undefined}
        icon={Key}
        breadcrumbs={[
          { label: 'API Keys', onClick: () => navigate('/api-keys') },
          { label: apiKey.name },
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
              <StatusBadge status={apiKey.is_active ? 'active' : 'inactive'} />
            </div>
            {apiKey.provider_name && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Provider</span>
                <Badge variant="outline">{apiKey.provider_name}</Badge>
              </div>
            )}
            {apiKey.account_name && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Account</span>
                <Badge variant="outline">{apiKey.account_name}</Badge>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Created</span>
              <span className="text-sm">{new Date(apiKey.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Updated</span>
              <span className="text-sm">{new Date(apiKey.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        </PageSection>

        <PageSection title="Security">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Key Prefix</span>
            </div>
            <div className="font-mono text-sm bg-muted/50 p-2 rounded">
              {apiKey.key_prefix || '—'}
            </div>
            <p className="text-xs text-muted-foreground">
              The full API key is never stored or displayed after creation.
            </p>
          </div>
        </PageSection>
      </div>

      <PageSection title="Expiration">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Expires At</span>
          </div>
          {apiKey.expires_at ? (
            <div className={`text-sm ${isExpired ? 'text-destructive' : isExpiringSoon ? 'text-yellow-500' : ''}`}>
              {new Date(apiKey.expires_at).toLocaleDateString()}
              {isExpired && ' (Expired)'}
              {isExpiringSoon && !isExpired && ' (Expiring Soon)'}
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">No expiration set</span>
          )}
          {apiKey.last_used_at && (
            <div className="mt-2">
              <span className="text-sm text-muted-foreground">Last used: </span>
              <span className="text-sm">{new Date(apiKey.last_used_at).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </PageSection>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit API Key</DialogTitle>
          </DialogHeader>
          <ApiKeyForm
            apiKey={apiKey}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditOpen(false)}
            isLoading={update.isPending}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete API Key</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete &quot;{apiKey.name}&quot;? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ApiKeyDetail;
