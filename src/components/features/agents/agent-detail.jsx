import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAgent } from '../../../hooks/use-agents';
import { AgentForm } from './agent-form';
import { PageHeader } from '../../layout/PageHeader';
import { PageSection } from '../../layout/PageContainer';
import { LoadingPage } from '../../feedback/LoadingSpinner';
import { ErrorState } from '../../feedback/ErrorState';
import { StatusBadge, Badge } from '../../common/Badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { ipc } from '../../../lib/ipc';
import { Bot, Pencil, Trash2, Plus, X, Tag, FileText } from 'lucide-react';

export function AgentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: agent, isLoading, error, update, remove } = useAgent(id);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const { data: allTags } = useQuery({
    queryKey: ['tags'],
    queryFn: () => ipc.tags.list(),
  });

  const { data: agentTags } = useQuery({
    queryKey: ['agents', id, 'tags'],
    queryFn: () => ipc.tags.getByEntity('agent', Number(id)),
    enabled: !!id,
  });

  const { data: agentNotes } = useQuery({
    queryKey: ['agents', id, 'notes'],
    queryFn: () => ipc.notes.list({ agent_id: Number(id) }),
    enabled: !!id,
  });

  const addTagMutation = useMutation({
    mutationFn: (tagId) => ipc.tags.addToEntity('agent', Number(id), tagId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents', id, 'tags'] });
      queryClient.invalidateQueries({ queryKey: ['agents', id] });
    },
  });

  const removeTagMutation = useMutation({
    mutationFn: (tagId) => ipc.tags.removeFromEntity('agent', Number(id), tagId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents', id, 'tags'] });
      queryClient.invalidateQueries({ queryKey: ['agents', id] });
    },
  });

  const createNoteMutation = useMutation({
    mutationFn: (data) => ipc.notes.create({ ...data, agent_id: Number(id) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents', id, 'notes'] });
      setIsNoteDialogOpen(false);
      setNewNoteTitle('');
      setNewNoteContent('');
    },
  });

  if (isLoading) return <LoadingPage label="Loading agent..." />;
  if (error) return <ErrorState error={error} />;
  if (!agent) return <ErrorState title="Agent not found" />;

  const handleUpdate = (data) => {
    update.mutate(data, {
      onSuccess: () => setIsEditOpen(false),
    });
  };

  const handleDelete = () => {
    remove.mutate(undefined, {
      onSuccess: () => navigate('/agents'),
    });
  };

  const handleCreateNote = () => {
    if (!newNoteTitle.trim()) return;
    createNoteMutation.mutate({
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
    });
  };

  const currentTagIds = agentTags?.map((t) => t.id) || [];
  const availableTags = allTags?.filter((t) => !currentTagIds.includes(t.id)) || [];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={agent.name}
        description={agent.description || undefined}
        icon={Bot}
        breadcrumbs={[
          { label: 'Agents', onClick: () => navigate('/agents') },
          { label: agent.name },
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
              <StatusBadge status={agent.is_active ? 'active' : 'inactive'} />
            </div>
            {agent.provider_name && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Provider</span>
                <Badge variant="outline">{agent.provider_name}</Badge>
              </div>
            )}
            {agent.model_name && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Model</span>
                <Badge variant="outline">{agent.model_name}</Badge>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Temperature</span>
              <span className="text-sm">{agent.temperature ?? '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Max Tokens</span>
              <span className="text-sm">{agent.max_tokens?.toLocaleString() || '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Created</span>
              <span className="text-sm">{new Date(agent.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Updated</span>
              <span className="text-sm">{new Date(agent.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        </PageSection>

        <PageSection title="System Prompt">
          <div className="space-y-3">
            {agent.system_prompt ? (
              <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono bg-muted/50 p-3 rounded-md max-h-48 overflow-y-auto">
                {agent.system_prompt}
              </pre>
            ) : (
              <p className="text-sm text-muted-foreground">No system prompt set.</p>
            )}
          </div>
        </PageSection>
      </div>

      <PageSection title="Tags">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {agentTags && agentTags.length > 0 ? (
              agentTags.map((tag) => (
                <Badge key={tag.id} variant="secondary" className="gap-1">
                  <span
                    className="size-2 rounded-full shrink-0"
                    style={{ backgroundColor: tag.color || '#6B7280' }}
                  />
                  {tag.name}
                  <button
                    onClick={() => removeTagMutation.mutate(tag.id)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">No tags assigned.</span>
            )}
          </div>
          {availableTags.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsTagDialogOpen(true)}
            >
              <Plus className="mr-1 h-3 w-3" />
              Add Tag
            </Button>
          )}
        </div>
      </PageSection>

      <PageSection title="Notes">
        <div className="space-y-3">
          {agentNotes && agentNotes.length > 0 ? (
            <div className="space-y-2">
              {agentNotes.map((note) => (
                <div key={note.id} className="rounded-md border p-3">
                  <h4 className="font-medium text-sm">{note.title}</h4>
                  {note.content && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {note.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No notes yet.</p>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsNoteDialogOpen(true)}
          >
            <FileText className="mr-1 h-3 w-3" />
            Add Note
          </Button>
        </div>
      </PageSection>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Agent</DialogTitle>
          </DialogHeader>
          <AgentForm
            agent={agent}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditOpen(false)}
            isLoading={update.isPending}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Agent</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete &quot;{agent.name}&quot;? This action cannot be undone.
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

      <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Tag</DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <Button
                key={tag.id}
                variant="outline"
                size="sm"
                onClick={() => {
                  addTagMutation.mutate(tag.id);
                  setIsTagDialogOpen(false);
                }}
              >
                <span
                  className="size-2 rounded-full mr-1 shrink-0"
                  style={{ backgroundColor: tag.color || '#6B7280' }}
                />
                {tag.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Note title"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
            />
            <textarea
              placeholder="Note content (optional)"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="w-full min-h-[100px] rounded-md border bg-background px-3 py-2 text-sm"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsNoteDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateNote}
                disabled={!newNoteTitle.trim() || createNoteMutation.isPending}
              >
                Create Note
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AgentDetail;
