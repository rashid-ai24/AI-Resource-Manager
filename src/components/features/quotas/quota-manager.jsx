import { useState } from 'react';
import { Plus, Pencil, Trash2, RefreshCw, AlertTriangle, Clock } from 'lucide-react';
import { useQuotas, useCreateQuota, useUpdateQuota, useDeleteQuota, useResetQuotaUsage } from '../../hooks/use-quotas';
import { Progress } from '../../ui/progress';
import { Button } from '../../common/ActionButton';
import { Badge } from '../../common/Badge';
import { Skeleton } from '../../ui/skeleton';
import { EmptyState } from '../../common/EmptyState';

function formatResetTime(dateString) {
  if (!dateString) return 'No reset scheduled';
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((date - now) / (1000 * 60 * 60));
  if (diffInHours < 0) return 'Overdue';
  if (diffInHours < 24) return `${diffInHours}h`;
  return `${Math.floor(diffInHours / 24)}d`;
}

function QuotaCard({ quota, onEdit, onDelete, onReset }) {
  const percentage = quota.limit_value > 0 ? Math.round((quota.used_value / quota.limit_value) * 100) : 0;
  const isWarning = percentage >= 80;
  const isExceeded = percentage >= 100;

  return (
    <div className="p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-sm">{quota.name}</h3>
          <Badge variant={isExceeded ? 'destructive' : isWarning ? 'secondary' : 'default'} className="text-xs">
            {quota.quota_type}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => onReset(quota.id)} title="Reset usage">
            <RefreshCw className="size-3" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onEdit(quota)} title="Edit">
            <Pencil className="size-3" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(quota.id)} title="Delete">
            <Trash2 className="size-3 text-destructive" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{quota.used_value.toLocaleString()} / {quota.limit_value.toLocaleString()} {quota.unit || 'units'}</span>
          <span>{percentage}%</span>
        </div>
        <Progress
          value={percentage}
          className={`h-2 ${isWarning ? 'bg-yellow-500/20' : ''}`}
          indicatorClassName={isExceeded ? 'bg-destructive' : isWarning ? 'bg-yellow-500' : ''}
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            {isWarning ? (
              <AlertTriangle className="size-3 text-yellow-500" />
            ) : (
              <Clock className="size-3" />
            )}
            <span>Resets in {formatResetTime(quota.next_reset_at)}</span>
          </div>
          {quota.provider_id && <span>Provider #{quota.provider_id}</span>}
        </div>
      </div>
    </div>
  );
}

function QuotaForm({ quota, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: quota?.name || '',
    quota_type: quota?.quota_type || 'daily',
    limit_value: quota?.limit_value || 0,
    unit: quota?.unit || 'tokens',
    provider_id: quota?.provider_id || '',
    account_id: quota?.account_id || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      limit_value: parseInt(formData.limit_value, 10),
      provider_id: formData.provider_id ? parseInt(formData.provider_id, 10) : null,
      account_id: formData.account_id ? parseInt(formData.account_id, 10) : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mt-1 px-3 py-2 rounded-md border bg-background text-sm"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Type</label>
          <select
            value={formData.quota_type}
            onChange={(e) => setFormData({ ...formData, quota_type: e.target.value })}
            className="w-full mt-1 px-3 py-2 rounded-md border bg-background text-sm"
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="hourly">Hourly</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Unit</label>
          <input
            type="text"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            className="w-full mt-1 px-3 py-2 rounded-md border bg-background text-sm"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Limit Value</label>
        <input
          type="number"
          value={formData.limit_value}
          onChange={(e) => setFormData({ ...formData, limit_value: e.target.value })}
          className="w-full mt-1 px-3 py-2 rounded-md border bg-background text-sm"
          min="0"
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{quota ? 'Update' : 'Create'}</Button>
      </div>
    </form>
  );
}

function QuotaManager() {
  const [showForm, setShowForm] = useState(false);
  const [editingQuota, setEditingQuota] = useState(null);

  const { data: quotas, isLoading } = useQuotas();
  const createMutation = useCreateQuota();
  const updateMutation = useUpdateQuota();
  const deleteMutation = useDeleteQuota();
  const resetMutation = useResetQuotaUsage();

  const handleCreate = (data) => {
    createMutation.mutate(data, {
      onSuccess: () => setShowForm(false),
    });
  };

  const handleUpdate = (data) => {
    updateMutation.mutate({ id: editingQuota.id, ...data }, {
      onSuccess: () => { setShowForm(false); setEditingQuota(null); },
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this quota?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleReset = (id) => {
    resetMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 rounded-lg border">
            <Skeleton className="h-4 w-32 mb-3" />
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="p-4 rounded-lg border">
        <QuotaForm
          quota={editingQuota}
          onSubmit={editingQuota ? handleUpdate : handleCreate}
          onCancel={() => { setShowForm(false); setEditingQuota(null); }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Quotas</h3>
        <Button onClick={() => setShowForm(true)} size="sm">
          <Plus className="size-4 mr-1" /> Add Quota
        </Button>
      </div>

      {!quotas || quotas.length === 0 ? (
        <EmptyState
          title="No quotas configured"
          description="Add quotas to track your API usage limits."
        />
      ) : (
        <div className="grid gap-4">
          {quotas.map((quota) => (
            <QuotaCard
              key={quota.id}
              quota={quota}
              onEdit={(q) => { setEditingQuota(q); setShowForm(true); }}
              onDelete={handleDelete}
              onReset={handleReset}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { QuotaManager };
export default QuotaManager;
