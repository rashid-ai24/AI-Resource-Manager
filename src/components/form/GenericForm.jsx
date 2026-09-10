import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { FormFieldRenderer } from './FormFieldRenderer';
import { Loader2 } from 'lucide-react';

function GenericForm({
  schema,
  fields,
  onSubmit,
  onCancel,
  defaultValues = {},
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  isLoading = false,
}) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    register,
  } = form;

  const isDisabled = isLoading || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field) => {
        const value = watch(field.name);
        const error = errors[field.name];

        return (
          <div key={field.name} className="space-y-2">
            {field.type !== 'checkbox' && field.type !== 'switch' && (
              <Label htmlFor={field.name} className={error ? 'text-destructive' : ''}>
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
            )}
            <FormFieldRenderer
              field={field}
              value={value}
              onChange={(newValue) => setValue(field.name, newValue, { shouldValidate: true })}
              onBlur={() => {}}
              disabled={isDisabled}
            />
            {error && (
              <p className="text-sm text-destructive">{error.message}</p>
            )}
          </div>
        );
      })}
      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isDisabled}
          >
            {cancelLabel}
          </Button>
        )}
        <Button type="submit" disabled={isDisabled}>
          {isDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

export { GenericForm };
export default GenericForm;
