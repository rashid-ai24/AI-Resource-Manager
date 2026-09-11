import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNote } from '../../../hooks/use-notes';
import { NoteForm } from './note-form';
import { NoteEditor } from './note-editor';
import { PageHeader } from '../../layout/PageHeader';
import { PageSection } from '../../layout/PageContainer';
import { LoadingPage } from '../../feedback/LoadingSpinner';
import { ErrorState } from '../../feedback/ErrorState';
import { Badge } from '../../common/Badge';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { FileText, Pencil, Trash2 } from 'lucide-react';

export function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: note, isLoading, error, update, remove } = useNote(id);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (isLoading) return <LoadingPage label="Loading note..." />;
  if (error) return <ErrorState error={error} />;
  if (!note) return <ErrorState title="Note not found" />;

  const handleUpdate = (data) => {
    update.mutate(data, {
      onSuccess: () => setIsEditOpen(false),
    });
  };

  const handleEditorSave = async (content) => {
    await update.mutateAsync({ content });
  };

  const handleDelete = () => {
    remove.mutate(undefined, {
      onSuccess: () => navigate('/notes'),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={note.title || 'Untitled'}
        description={note.agent_name || note.project_name || undefined}
        icon={FileText}
        breadcrumbs={[
          { label: 'Notes', onClick: () => navigate('/notes') },
          { label: note.title || 'Untitled' },
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
              <span className="text-sm text-muted-foreground">Title</span>
              <span className="text-sm font-medium">{note.title || '—'}</span>
            </div>
            {note.agent_name && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Agent</span>
                <Badge variant="outline">{note.agent_name}</Badge>
              </div>
            )}
            {note.project_name && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Project</span>
                <Badge variant="outline">{note.project_name}</Badge>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Created</span>
              <span className="text-sm">{new Date(note.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Updated</span>
              <span className="text-sm">{new Date(note.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        </PageSection>
      </div>

      <PageSection title="Content">
        <NoteEditor note={note} onSave={handleEditorSave} />
      </PageSection>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <NoteForm
            note={note}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditOpen(false)}
            isLoading={update.isPending}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete &quot;{note.title || 'Untitled'}&quot;? This action cannot be undone.
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

export default NoteDetail;
