import { Badge } from '../../common/Badge';
import { FolderOpen } from 'lucide-react';

export function ProjectCard({ project, onClick }) {
  return (
    <div
      onClick={() => onClick?.(project)}
      className="group rounded-lg border bg-card p-4 hover:bg-accent/50 cursor-pointer transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
            <FolderOpen className="size-4 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            {project.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {project.description}
              </p>
            )}
          </div>
        </div>
        <Badge variant={project.is_active ? 'success' : 'secondary'}>
          {project.is_active ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      {project.path && (
        <div className="mt-3 text-xs text-muted-foreground font-mono truncate">
          {project.path}
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
