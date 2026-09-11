import { GenericForm } from '../../form';
import { AgentFormSchema, agentFormFields } from '../../../lib/form-schemas';

export function AgentForm({ agent, onSubmit, onCancel, isLoading }) {
  const defaultValues = agent
    ? {
        name: agent.name || '',
        description: agent.description || '',
        provider_id: agent.provider_id || null,
        model_id: agent.model_id || null,
        system_prompt: agent.system_prompt || '',
        temperature: agent.temperature ?? 0.7,
        max_tokens: agent.max_tokens ?? 4096,
        is_active: agent.is_active ?? 1,
      }
    : {
        name: '',
        description: '',
        provider_id: null,
        model_id: null,
        system_prompt: '',
        temperature: 0.7,
        max_tokens: 4096,
        is_active: 1,
      };

  return (
    <GenericForm
      schema={AgentFormSchema}
      fields={agentFormFields}
      onSubmit={onSubmit}
      onCancel={onCancel}
      defaultValues={defaultValues}
      submitLabel={agent ? 'Update Agent' : 'Create Agent'}
      isLoading={isLoading}
    />
  );
}

export default AgentForm;
