import { GenericForm } from '../../form';
import { NoteFormSchema, noteFormFields } from '../../../lib/form-schemas';

export function NoteForm({ note, onSubmit, onCancel, isLoading }) {
  const defaultValues = note
    ? {
        title: note.title || '',
        content: note.content || '',
        agent_id: note.agent_id || null,
        project_id: note.project_id || null,
      }
    : {
        title: '',
        content: '',
        agent_id: null,
        project_id: null,
      };

  return (
    <GenericForm
      schema={NoteFormSchema}
      fields={noteFormFields}
      onSubmit={onSubmit}
      onCancel={onCancel}
      defaultValues={defaultValues}
      submitLabel={note ? 'Update Note' : 'Create Note'}
      isLoading={isLoading}
    />
  );
}

export default NoteForm;
