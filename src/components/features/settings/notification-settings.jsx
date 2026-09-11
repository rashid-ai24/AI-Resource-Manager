import { useSettings } from '../../../hooks/use-settings';
import { Label } from '@/components/ui/label';

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${checked ? 'bg-primary' : 'bg-input'}`}
    >
      <span
        className={`pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`}
      />
    </button>
  );
}

export function NotificationSettings() {
  const { settings, setSetting } = useSettings();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Enable Notifications</Label>
          <p className="text-xs text-muted-foreground">Show desktop notifications for important events</p>
        </div>
        <ToggleSwitch
          checked={settings['notifications.enabled'] ?? true}
          onChange={(checked) => setSetting({ key: 'notifications.enabled', value: checked })}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Sound</Label>
          <p className="text-xs text-muted-foreground">Play a sound when a notification arrives</p>
        </div>
        <ToggleSwitch
          checked={settings['notifications.sound'] ?? true}
          onChange={(checked) => setSetting({ key: 'notifications.sound', value: checked })}
        />
      </div>
    </div>
  );
}

export default NotificationSettings;
