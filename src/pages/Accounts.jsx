import { useState } from 'react';
import { AccountList, AccountForm } from '../components/features/accounts';
import { useAccounts } from '../hooks/use-accounts';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

export default function Accounts() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { create } = useAccounts();

  const handleCreate = (data) => {
    create.mutate(data, {
      onSuccess: () => setIsCreateOpen(false),
    });
  };

  return (
    <>
      <AccountList onCreateClick={() => setIsCreateOpen(true)} />

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
          </DialogHeader>
          <AccountForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={create.isPending}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
