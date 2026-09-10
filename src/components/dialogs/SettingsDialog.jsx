import { useState } from 'react';
import { Settings, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BaseDialog } from './BaseDialog';
import { Button } from '@/components/ui/button';
import { ThemeSwitcherDropdown } from '../common/ThemeSwitcher';

export function SettingsDialog({
  open,
  onOpenChange,
  settings,
  onSave,
}) {
  const [localSettings, setLocalSettings] = useState(settings || {});

  const handleSave = () => {
    onSave?.(localSettings);
    onOpenChange?.(false);
  };

  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Settings"
      description="Manage your application settings"
      maxWidth="md"
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Check className="size-4 mr-2" />
            Save Changes
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <SettingsSection
          title="Appearance"
          description="Customize the look and feel"
        >
          <div className="space-y-4">
            <SettingsRow
              label="Theme"
              description="Select your preferred theme"
            >
              <ThemeSwitcherDropdown />
            </SettingsRow>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Notifications"
          description="Configure notification preferences"
        >
          <div className="space-y-4">
            <SettingsRow
              label="Desktop Notifications"
              description="Show desktop notifications for important events"
            >
              <ToggleSwitch
                checked={localSettings.desktopNotifications ?? true}
                onChange={(checked) =>
                  setLocalSettings(prev => ({ ...prev, desktopNotifications: checked }))
                }
              />
            </SettingsRow>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Data"
          description="Manage your data and storage"
        >
          <div className="space-y-4">
            <SettingsRow
              label="Auto Backup"
              description="Automatically backup your data daily"
            >
              <ToggleSwitch
                checked={localSettings.autoBackup ?? true}
                onChange={(checked) =>
                  setLocalSettings(prev => ({ ...prev, autoBackup: checked }))
                }
              />
            </SettingsRow>
          </div>
        </SettingsSection>
      </div>
    </BaseDialog>
  );
}

function SettingsSection({ title, description, children }) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function SettingsRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        checked ? 'bg-primary' : 'bg-input'
      )}
    >
      <span
        className={cn(
          'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform',
          checked ? 'translate-x-4' : 'translate-x-0'
        )}
      />
    </button>
  );
}

export default SettingsDialog;
