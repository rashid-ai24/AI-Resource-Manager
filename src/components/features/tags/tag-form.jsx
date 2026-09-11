import { GenericForm } from '../../form';
import { TagFormSchema, tagFormFields } from '../../../lib/form-schemas';

export function TagForm({ tag, onSubmit, onCancel, isLoading }) {
  const defaultValues = tag
    ? {
        name: tag.name || '',
        color: tag.color || '#6B7280',
      }
    : {
        name: '',
        color: '#6B7280',
      };

  return (
    <GenericForm
      schema={TagFormSchema}
      fields={tagFormFields}
      onSubmit={onSubmit}
      onCancel={onCancel}
      defaultValues={defaultValues}
      submitLabel={tag ? 'Update Tag' : 'Create Tag'}
      isLoading={isLoading}
    />
  );
}

export default TagForm;
