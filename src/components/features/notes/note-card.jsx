import { Badge } from '../../common/Badge';
import { FileText } from 'lucide-react';

export function NoteCard({ note, onClick }) {
  return (
    <div
      onClick={() => onClick?.(note)}
      className="group rounded-lg border bg-card p-4 hover:bg-accent/50 cursor-pointer transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="p-2 rounded-lg bg-primary/10 shrink-0 mt-0.5">
            <FileText className="size-4 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
              {note.title || 'Untitled'}
            </h3>
            {note.content && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {note.content.length > 150 ? note.content.substring(0, 150) + '...' : note.content}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        {note.agent_name && (
          <Badge variant="outline" className="text-xs">
            {note.agent_name}
          </Badge>
        )}
        {note.project_name && (
          <Badge variant="outline" className="text-xs">
            {note.project_name}
          </Badge>
        )}
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        {note.created_at && (
          <span>Created: {new Date(note.created_at).toLocaleDateString()}</span>
        )}
        {note.updated_at && (
          <span>Updated: {new Date(note.updated_at).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
}

export default NoteCard;
