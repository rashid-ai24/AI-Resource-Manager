import { useState } from 'react';
import { Plus, Pencil, Trash2, Copy, FileText } from 'lucide-react';
import { useTemplates, useCreateTemplate, useUpdateTemplate, useDeleteTemplate, useDuplicateTemplate } from '../../hooks/use-templates';
import { Button } from '../../common/ActionButton';
import { Badge } from '../../common/Badge';
import { Skeleton } from '../../ui/skeleton';
import { EmptyState } from '../../common/EmptyState';

const templateTypeLabels = {
  agent: 'Agent',
  project: 'Project',
  workflow: 'Workflow',
  prompt: 'Prompt',
  custom: 'Custom',
};

function TemplateCard({ template, onEdit, onDelete, onDuplicate }) {
  return (
    <div className="p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-muted-foreground" />
          <h3 className="font-medium text-sm">{template.name}</h3>
          <Badge variant="secondary" className="text-xs">
            {templateTypeLabels[template.template_type] || template.template_type}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => onDuplicate(template.id)} title="Duplicate">
            <Copy className="size-3" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onEdit(template)} title="Edit">
            <Pencil className="size-3" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(template.id)} title="Delete">
            <Trash2 className="size-3 text-destructive" />
          </Button>
        </div>
      </div>
      {template.description && (
        <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>
      )}
      <div className="mt-2">
        <span className="text-xs text-muted-foreground">
          {template.config_json ? Object.keys(JSON.parse(template.config_json || '{}')).length : 0} config fields
        </span>
      </div>
    </div>
  );
}

function TemplateForm({ template, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    description: template?.description || '',
    template_type: template?.template_type || 'agent',
    config: template?.config_json ? JSON.parse(template.config_json) : {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full mt-1 px-3 py-2 rounded-md border bg-background text-sm"
          rows={2}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Type</label>
        <select
          value={formData.template_type}
          onChange={(e) => setFormData({ ...formData, template_type: e.target.value })}
          className="w-full mt-1 px-3 py-2 rounded-md border bg-background text-sm"
        >
          {Object.entries(templateTypeLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{template ? 'Update' : 'Create'}</Button>
      </div>
    </form>
  );
}

function TemplateManager() {
  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const { data: templates, isLoading } = useTemplates();
  const createMutation = useCreateTemplate();
  const updateMutation = useUpdateTemplate();
  const deleteMutation = useDeleteTemplate();
  const duplicateMutation = useDuplicateTemplate();

  const handleCreate = (data) => {
    createMutation.mutate(data, {
      onSuccess: () => setShowForm(false),
    });
  };

  const handleUpdate = (data) => {
    updateMutation.mutate({ id: editingTemplate.id, ...data }, {
      onSuccess: () => { setShowForm(false); setEditingTemplate(null); },
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this template?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleDuplicate = (id) => {
    duplicateMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 rounded-lg border">
            <Skeleton className="h-4 w-32 mb-3" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="p-4 rounded-lg border">
        <TemplateForm
          template={editingTemplate}
          onSubmit={editingTemplate ? handleUpdate : handleCreate}
          onCancel={() => { setShowForm(false); setEditingTemplate(null); }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Templates</h3>
        <Button onClick={() => setShowForm(true)} size="sm">
          <Plus className="size-4 mr-1" /> Add Template
        </Button>
      </div>

      {!templates || templates.length === 0 ? (
        <EmptyState
          title="No templates"
          description="Create templates to save reusable configurations."
          icon={FileText}
        />
      ) : (
        <div className="grid gap-4">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onEdit={(t) => { setEditingTemplate(t); setShowForm(true); }}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { TemplateManager };
export default TemplateManager;
