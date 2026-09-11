import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from '../../../hooks/use-accounts';
import { AccountForm } from './account-form';
import { PageHeader } from '../../layout/PageHeader';
import { PageSection } from '../../layout/PageContainer';
import { LoadingPage } from '../../feedback/LoadingSpinner';
import { ErrorState } from '../../feedback/ErrorState';
import { StatusBadge, Badge } from '../../common/Badge';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { ipc } from '../../../lib/ipc';
import { User, Pencil, Trash2, Key } from 'lucide-react';

export function AccountDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: account, isLoading, error, update, remove } = useAccount(id);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data: apiKeys } = useQuery({
    queryKey: ['apiKeys', { account_id: Number(id) }],
    queryFn: () => ipc.apiKeys.list({ account_id: Number(id) }),
    enabled: !!id,
  });

  if (isLoading) return <LoadingPage label="Loading account..." />;
  if (error) return <ErrorState error={error} />;
  if (!account) return <ErrorState title="Account not found" />;

  const handleUpdate = (data) => {
    update.mutate(data, {
      onSuccess: () => setIsEditOpen(false),
    });
  };

  const handleDelete = () => {
    remove.mutate(undefined, {
      onSuccess: () => navigate('/accounts'),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={account.name}
        description={account.email || undefined}
        icon={User}
        breadcrumbs={[
          { label: 'Accounts', onClick: () => navigate('/accounts') },
          { label: account.name },
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
              <StatusBadge status={account.is_active ? 'active' : 'inactive'} />
            </div>
            {account.provider_name && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Provider</span>
                <Badge variant="outline">{account.provider_name}</Badge>
              </div>
            )}
            {account.email && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm">{account.email}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Created</span>
              <span className="text-sm">{new Date(account.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Updated</span>
              <span className="text-sm">{new Date(account.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        </PageSection>

        <PageSection title="Details">
          <div className="space-y-3">
            <div>
              <span className="text-sm text-muted-foreground">Description</span>
              <p className="text-sm mt-1">{account.description || 'No description provided.'}</p>
            </div>
          </div>
        </PageSection>
      </div>

      <PageSection title="API Keys">
        <div className="space-y-3">
          {apiKeys && apiKeys.length > 0 ? (
            <div className="space-y-2">
              {apiKeys.map((key) => (
                <div key={key.id} className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-3">
                    <Key className="size-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium text-sm">{key.name}</span>
                      <span className="text-muted-foreground text-sm ml-2">{key.key_prefix}</span>
                    </div>
                  </div>
                  <Badge variant={key.is_active ? 'success' : 'secondary'}>
                    {key.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No API keys for this account.</p>
          )}
        </div>
      </PageSection>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
          </DialogHeader>
          <AccountForm
            account={account}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditOpen(false)}
            isLoading={update.isPending}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete &quot;{account.name}&quot;? This action cannot be undone.
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

export default AccountDetail;
