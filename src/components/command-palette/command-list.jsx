import { useState, useEffect, useRef } from 'react';
import { CommandItem } from './command-item';
import { cn } from '@/lib/utils';

export function CommandList({ commands, onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    setSelectedIndex(0);
  }, [commands]);

  useEffect(() => {
    if (listRef.current) {
      const items = listRef.current.querySelectorAll('[role="option"]');
      items[selectedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, commands.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (commands[selectedIndex]) {
          onSelect(commands[selectedIndex]);
        }
        break;
    }
  };

  if (commands.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-muted-foreground">
        No commands found
      </div>
    );
  }

  const grouped = commands.reduce((acc, cmd) => {
    const cat = cmd.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(cmd);
    return acc;
  }, {});

  let flatIndex = -1;

  return (
    <div
      ref={listRef}
      role="listbox"
      onKeyDown={handleKeyDown}
      className="max-h-[300px] overflow-y-auto p-1"
    >
      {Object.entries(grouped).map(([category, cmds]) => (
        <div key={category}>
          <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
            {category}
          </div>
          {cmds.map((cmd) => {
            flatIndex++;
            const idx = flatIndex;
            return (
              <CommandItem
                key={cmd.id}
                command={cmd}
                isSelected={idx === selectedIndex}
                onSelect={() => onSelect(cmd)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default CommandList;
