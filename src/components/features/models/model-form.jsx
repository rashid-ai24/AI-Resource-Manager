import { GenericForm } from '../../form';
import { ModelFormSchema, modelFormFields } from '../../../lib/form-schemas';

export function ModelForm({ model, onSubmit, onCancel, isLoading }) {
  const defaultValues = model
    ? {
        name: model.name || '',
        provider_id: model.provider_id || null,
        description: model.description || '',
        max_tokens: model.max_tokens || 4096,
        cost_per_1k_input: model.cost_per_1k_input || 0,
        cost_per_1k_output: model.cost_per_1k_output || 0,
        is_active: model.is_active ?? 1,
      }
    : {
        name: '',
        provider_id: null,
        description: '',
        max_tokens: 4096,
        cost_per_1k_input: 0,
        cost_per_1k_output: 0,
        is_active: 1,
      };

  return (
    <GenericForm
      schema={ModelFormSchema}
      fields={modelFormFields}
      onSubmit={onSubmit}
      onCancel={onCancel}
      defaultValues={defaultValues}
      submitLabel={model ? 'Update Model' : 'Create Model'}
      isLoading={isLoading}
    />
  );
}

export default ModelForm;
