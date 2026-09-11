import { useState } from 'react';
import { AgentList, AgentForm } from '../components/features/agents';
import { useAgents } from '../hooks/use-agents';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

export default function Agents() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { create } = useAgents();

  const handleCreate = (data) => {
    create.mutate(data, {
      onSuccess: () => setIsCreateOpen(false),
    });
  };

  return (
    <>
      <AgentList onCreateClick={() => setIsCreateOpen(true)} />

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Agent</DialogTitle>
          </DialogHeader>
          <AgentForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={create.isPending}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
