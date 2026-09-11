import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommandPaletteStore } from '../../stores/command-palette-store';
import { CommandList } from './command-list';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import {
  LayoutDashboard, Bot, Building2, Cpu, User, Key, FolderOpen,
  FileText, Tag, Settings, Search, Plus
} from 'lucide-react';

const commands = [
  // Navigation
  { id: 'nav-dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'Navigation', action: 'navigate', path: '/' },
  { id: 'nav-agents', label: 'Agents', icon: Bot, category: 'Navigation', action: 'navigate', path: '/agents' },
  { id: 'nav-providers', label: 'Providers', icon: Building2, category: 'Navigation', action: 'navigate', path: '/providers' },
  { id: 'nav-models', label: 'Models', icon: Cpu, category: 'Navigation', action: 'navigate', path: '/models' },
  { id: 'nav-accounts', label: 'Accounts', icon: User, category: 'Navigation', action: 'navigate', path: '/accounts' },
  { id: 'nav-api-keys', label: 'API Keys', icon: Key, category: 'Navigation', action: 'navigate', path: '/api-keys' },
  { id: 'nav-projects', label: 'Projects', icon: FolderOpen, category: 'Navigation', action: 'navigate', path: '/projects' },
  { id: 'nav-notes', label: 'Notes', icon: FileText, category: 'Navigation', action: 'navigate', path: '/notes' },
  { id: 'nav-tags', label: 'Tags', icon: Tag, category: 'Navigation', action: 'navigate', path: '/tags' },
  { id: 'nav-settings', label: 'Settings', icon: Settings, category: 'Navigation', action: 'navigate', path: '/settings' },

  // Create
  { id: 'create-agent', label: 'New Agent', icon: Plus, category: 'Create', action: 'create', entityType: 'agents' },
  { id: 'create-provider', label: 'New Provider', icon: Plus, category: 'Create', action: 'create', entityType: 'providers' },
  { id: 'create-model', label: 'New Model', icon: Plus, category: 'Create', action: 'create', entityType: 'models' },
  { id: 'create-project', label: 'New Project', icon: Plus, category: 'Create', action: 'create', entityType: 'projects' },
  { id: 'create-note', label: 'New Note', icon: Plus, category: 'Create', action: 'create', entityType: 'notes' },
  { id: 'create-tag', label: 'New Tag', icon: Plus, category: 'Create', action: 'create', entityType: 'tags' },

  // Actions
  { id: 'action-search', label: 'Search', icon: Search, category: 'Actions', action: 'navigate', path: '/search', shortcut: '⌘F' },
];

export function CommandPalette() {
  const { isOpen, searchQuery, closePalette, setSearchQuery } = useCommandPaletteStore();
  const navigate = useNavigate();

  const filteredCommands = useMemo(() => {
    if (!searchQuery) return commands;
    const q = searchQuery.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSelect = useCallback((command) => {
    closePalette();
    if (command.action === 'navigate') {
      navigate(command.path);
    }
  }, [closePalette, navigate]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closePalette()}>
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Command Palette</DialogTitle>
        </DialogHeader>
        <div className="border-b p-3">
          <Input
            placeholder="Type a command or search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 shadow-none"
            autoFocus
          />
        </div>
        <CommandList
          commands={filteredCommands}
          onSelect={handleSelect}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CommandPalette;
