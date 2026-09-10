import { useState, useEffect, useCallback } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { AutocompleteInput, AutocompleteList, AutocompleteItem, AutocompleteEmpty } from '../autocomplete';
import { useAutocomplete } from '../../hooks/useAutocomplete';

function FormFieldRenderer({ field, value, onChange, onBlur, disabled }) {
  const { type, name, label, placeholder, options, min, max, step, rows, entity } = field;

  switch (type) {
    case 'text':
      return (
        <Input
          id={name}
          placeholder={placeholder}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
        />
      );

    case 'textarea':
      return (
        <Textarea
          id={name}
          placeholder={placeholder}
          rows={rows || 3}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
        />
      );

    case 'number':
      return (
        <Input
          id={name}
          type="number"
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          onBlur={onBlur}
          disabled={disabled}
        />
      );

    case 'select':
      return (
        <Select value={value || ''} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger id={name}>
            <SelectValue placeholder={placeholder || `Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case 'autocomplete':
      return (
        <AutocompleteField
          entity={entity}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      );

    case 'checkbox':
      return (
        <div className="flex items-center gap-2">
          <Checkbox
            id={name}
            checked={value || false}
            onCheckedChange={onChange}
            disabled={disabled}
          />
          <Label htmlFor={name} className="cursor-pointer">
            {label}
          </Label>
        </div>
      );

    case 'switch':
      return (
        <div className="flex items-center gap-2">
          <Switch
            id={name}
            checked={value || false}
            onCheckedChange={onChange}
            disabled={disabled}
          />
          <Label htmlFor={name} className="cursor-pointer">
            {label}
          </Label>
        </div>
      );

    case 'slider':
      return (
        <div className="space-y-2">
          <input
            id={name}
            type="range"
            min={min || 0}
            max={max || 100}
            step={step || 1}
            value={value || 0}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            disabled={disabled}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{min || 0}</span>
            <span>{value}</span>
            <span>{max || 100}</span>
          </div>
        </div>
      );

    case 'date':
      return (
        <Input
          id={name}
          type="date"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
        />
      );

    default:
      return (
        <Input
          id={name}
          placeholder={placeholder}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
        />
      );
  }
}

function AutocompleteField({ entity, value, onChange, placeholder, disabled }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const { query, setQuery, isOpen, setIsOpen, closePalette, results, isLoading, selectedIndex, setSelectedIndex, inputRef, listRef, handleKeyDown, handleSelect } = useAutocomplete(entity, {
    onSelect: (item) => {
      setSelectedItem(item);
      setInputValue(item.name || item.title || '');
      onChange(item.id);
      closePalette();
    },
  });

  useEffect(() => {
    if (value && !selectedItem) {
      // Could fetch the item by ID if needed
    }
  }, [value, selectedItem]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setQuery(newValue);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative">
      <AutocompleteInput
        ref={inputRef}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleInputFocus}
        disabled={disabled}
        aria-autocomplete="list"
        aria-expanded={isOpen}
      />
      {isOpen && (
        <AutocompleteList ref={listRef}>
          {isLoading ? (
            <AutocompleteEmpty>Loading...</AutocompleteEmpty>
          ) : results.length === 0 ? (
            <AutocompleteEmpty>No results found</AutocompleteEmpty>
          ) : (
            results.map((item, index) => (
              <AutocompleteItem
                key={item.id}
                isSelected={index === selectedIndex}
                onClick={() => handleSelect(item)}
              >
                {item.name || item.title || `Item ${item.id}`}
              </AutocompleteItem>
            ))
          )}
        </AutocompleteList>
      )}
    </div>
  );
}

export { FormFieldRenderer };
export default FormFieldRenderer;
