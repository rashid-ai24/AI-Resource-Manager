import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../../../hooks/use-notes';
import { NoteCard } from './note-card';
import { PageHeader } from '../../layout/PageHeader';
import { EmptyState } from '../../feedback/EmptyState';
import { LoadingPage } from '../../feedback/LoadingSpinner';
import { ErrorState } from '../../feedback/ErrorState';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../common/Badge';
import { FileText, Plus, Search } from 'lucide-react';

export function NoteList({ onCreateClick }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filters = {};
  if (search) filters.search = search;

  const { data: notes, isLoading, error, refetch } = useNotes(filters);

  const handleRowClick = (note) => {
    navigate(`/notes/${note.id}`);
  };

  if (isLoading) return <LoadingPage label="Loading notes..." />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  const list = notes || [];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Notes"
        description="Manage your notes"
        icon={FileText}
        actions={
          <Button onClick={onCreateClick}>
            <Plus className="mr-2 h-4 w-4" />
            Add Note
          </Button>
        }
      />

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="secondary">{list.length}</Badge>
      </div>

      {list.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No notes found"
          description={search ? 'Try a different search term.' : 'Add your first note to get started.'}
          action={
            !search && (
              <Button onClick={onCreateClick}>
                <Plus className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={handleRowClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NoteList;
