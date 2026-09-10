import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConfirmDialog } from './BaseDialog';

export function DeleteDialog({
  open,
  onOpenChange,
  title,
  description,
  itemName,
  onConfirm,
  loading = false,
  children,
}) {
  const defaultTitle = title || 'Delete Item';
  const defaultDescription = description || `Are you sure you want to delete "${itemName}"? This action cannot be undone.`;

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={defaultTitle}
      description={defaultDescription}
      confirmLabel="Delete"
      cancelLabel="Cancel"
      onConfirm={onConfirm}
      loading={loading}
      variant="destructive"
    >
      <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
        <AlertTriangle className="size-5 text-destructive shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-destructive">Warning</p>
          <p className="text-muted-foreground mt-1">
            This will permanently delete {itemName ? `"${itemName}"` : 'this item'} and all associated data.
          </p>
        </div>
      </div>
      {children}
    </ConfirmDialog>
  );
}

export default DeleteDialog;
