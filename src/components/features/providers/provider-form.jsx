import { GenericForm } from '../../form';
import { ProviderFormSchema, providerFormFields } from '../../../lib/form-schemas';

export function ProviderForm({ provider, onSubmit, onCancel, isLoading }) {
  const defaultValues = provider
    ? {
        name: provider.name || '',
        description: provider.description || '',
        base_url: provider.base_url || '',
        is_active: provider.is_active ?? 1,
      }
    : {
        name: '',
        description: '',
        base_url: '',
        is_active: 1,
      };

  return (
    <GenericForm
      schema={ProviderFormSchema}
      fields={providerFormFields}
      onSubmit={onSubmit}
      onCancel={onCancel}
      defaultValues={defaultValues}
      submitLabel={provider ? 'Update Provider' : 'Create Provider'}
      isLoading={isLoading}
    />
  );
}

export default ProviderForm;
