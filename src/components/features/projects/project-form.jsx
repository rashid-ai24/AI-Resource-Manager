import { GenericForm } from '../../form';
import { ProjectFormSchema, projectFormFields } from '../../../lib/form-schemas';

export function ProjectForm({ project, onSubmit, onCancel, isLoading }) {
  const defaultValues = project
    ? {
        name: project.name || '',
        description: project.description || '',
        path: project.path || '',
        is_active: project.is_active ?? 1,
      }
    : {
        name: '',
        description: '',
        path: '',
        is_active: 1,
      };

  return (
    <GenericForm
      schema={ProjectFormSchema}
      fields={projectFormFields}
      onSubmit={onSubmit}
      onCancel={onCancel}
      defaultValues={defaultValues}
      submitLabel={project ? 'Update Project' : 'Create Project'}
      isLoading={isLoading}
    />
  );
}

export default ProjectForm;
