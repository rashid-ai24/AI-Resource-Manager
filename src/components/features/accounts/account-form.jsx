import { GenericForm } from '../../form';
import { AccountFormSchema, accountFormFields } from '../../../lib/form-schemas';

export function AccountForm({ account, onSubmit, onCancel, isLoading }) {
  const defaultValues = account
    ? {
        provider_id: account.provider_id || null,
        name: account.name || '',
        email: account.email || '',
        description: account.description || '',
        is_active: account.is_active ?? 1,
      }
    : {
        provider_id: null,
        name: '',
        email: '',
        description: '',
        is_active: 1,
      };

  return (
    <GenericForm
      schema={AccountFormSchema}
      fields={accountFormFields}
      onSubmit={onSubmit}
      onCancel={onCancel}
      defaultValues={defaultValues}
      submitLabel={account ? 'Update Account' : 'Create Account'}
      isLoading={isLoading}
    />
  );
}

export default AccountForm;
