import { GenericForm } from '../../form';
import { ApiKeyFormSchema, apiKeyFormFields } from '../../../lib/form-schemas';

export function ApiKeyForm({ apiKey, onSubmit, onCancel, isLoading }) {
  const defaultValues = apiKey
    ? {
        provider_id: apiKey.provider_id || null,
        account_id: apiKey.account_id || null,
        name: apiKey.name || '',
        description: apiKey.description || '',
        expires_at: apiKey.expires_at || null,
        is_active: apiKey.is_active ?? 1,
      }
    : {
        provider_id: null,
        account_id: null,
        name: '',
        key: '',
        description: '',
        expires_at: null,
        is_active: 1,
      };

  return (
    <GenericForm
      schema={ApiKeyFormSchema}
      fields={apiKeyFormFields}
      onSubmit={onSubmit}
      onCancel={onCancel}
      defaultValues={defaultValues}
      submitLabel={apiKey ? 'Update API Key' : 'Create API Key'}
      isLoading={isLoading}
    />
  );
}

export default ApiKeyForm;
