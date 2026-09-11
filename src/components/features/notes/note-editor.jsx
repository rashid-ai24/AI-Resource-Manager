import { useState, useEffect, useCallback, useRef } from 'react';
import { Textarea } from '../../ui/textarea';
import { cn } from '@/lib/utils';

export function NoteEditor({ note, onSave, className }) {
  const [content, setContent] = useState(note?.content || '');
  const [saveStatus, setSaveStatus] = useState('saved');
  const saveTimeoutRef = useRef(null);
  const idleTimeoutRef = useRef(null);
  const lastSavedRef = useRef(note?.content || '');

  useEffect(() => {
    setContent(note?.content || '');
    lastSavedRef.current = note?.content || '';
    setSaveStatus('saved');
  }, [note?.id]);

  const save = useCallback(async () => {
    if (content === lastSavedRef.current) return;
    setSaveStatus('saving');
    try {
      await onSave(content);
      lastSavedRef.current = content;
      setSaveStatus('saved');
    } catch {
      setSaveStatus('error');
    }
  }, [content, onSave]);

  useEffect(() => {
    if (content !== lastSavedRef.current) {
      setSaveStatus('unsaved');
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        save();
      }, 2000);
    }
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [content, save]);

  useEffect(() => {
    const resetIdleTimer = () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => {
        if (content !== lastSavedRef.current) {
          save();
        }
      }, 30000);
    };

    resetIdleTimer();
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);

    return () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
    };
  }, [content, save]);

  const handleBlur = () => {
    if (content !== lastSavedRef.current) {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      save();
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Content (Markdown supported)</span>
        <span className={cn(
          'text-xs',
          saveStatus === 'saved' && 'text-emerald-600',
          saveStatus === 'saving' && 'text-muted-foreground',
          saveStatus === 'unsaved' && 'text-amber-600',
          saveStatus === 'error' && 'text-destructive',
        )}>
          {saveStatus === 'saved' && 'Saved'}
          {saveStatus === 'saving' && 'Saving...'}
          {saveStatus === 'unsaved' && 'Unsaved'}
          {saveStatus === 'error' && 'Error saving'}
        </span>
      </div>
      <Textarea
        placeholder="Write your note content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleBlur}
        rows={20}
        className="font-mono text-sm min-h-[400px]"
      />
    </div>
  );
}

export default NoteEditor;
